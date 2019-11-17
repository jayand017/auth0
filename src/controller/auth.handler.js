let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../config/secret');
const conn = require('../config/db');


const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


module.exports = class AuthHandler {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {
            const client = new MongoClient(conn.uri, { useNewUrlParser: true });
            client.connect(err => {
                if (err) {
                    return res.status(403).send(err);
                }
                const col = client.db(conn.dbName).collection(conn.colUsers);
                col.findOne({ "email": username }, (err, result) => {
                    if (err) {
                        return res.status(503).send(err);
                    }
                    if(username == result.email && bcrypt.compareSync(password, result.password)) {
                        let token = jwt.sign({username: username}, config.secret, { expiresIn: '24h' });
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            message: 'Incorrect Username or Password'
                        });
                    }
                    client.close();
                })
            });
        } else {
            res.json({
                success: false,
                message: 'Authentication failed!'
            });
        }
    }

    register(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        const saltRounds = 4;

        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            const client = new MongoClient(conn.uri, { useNewUrlParser: true });
            client.connect(err => {
                if (err) {
                    return res.status(403).send(err);
                }
                const col = client.db(conn.dbName).collection(conn.colUsers)
                const query = {
                    "email": username,
                    "first_name": "",
                    "last_name": "",
                    "password": hash,
                    "date_created": "",
                    "status": "Unverified"
                }
                col.insertOne(query, (err, result) => {
                    if (err) {
                        return res.status(503).send(err)
                    }
                    res.json({
                        success: true,
                        message: 'User Registered Successfully'
                    });
                    client.close();
                });
            });
        });
    }

    dashboard(req, res) {
        res.json({
            success: true,
            message: 'Redirecting to dashboard'
        });
    }
}