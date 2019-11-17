const express = require('express');
const bodyParser = require('body-parser');
const AuthHandler = require('./src/controller/auth.handler');
let auth = require('./src/controller/auth.middleware');

let app = express();
let handler = new AuthHandler();

// Starting point of the server

const AUTH_PORT = process.env.AUTH_PORT || 9001;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//Routes & Handlers
app.post('/register', handler.register);
app.post('/login', handler.login);
app.get('/validate', auth.validateToken, handler.dashboard);
app.listen(AUTH_PORT, () => console.log(`Server is listening on port: ${AUTH_PORT}`))
