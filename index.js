const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const AuthHandler = require('./src/controller/auth.handler');

let app = express();
let handler = new AuthHandler();

// Starting point of the server
const AUTH_PORT = process.env.AUTH_PORT || 9001;
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Routes & Handlers
const PREFIX = "/api/auth0/v1";
app.post(PREFIX + '/register', handler.register);
app.post(PREFIX + '/login', handler.login);
app.listen(AUTH_PORT, () => console.log(`Server is listening on port: ${AUTH_PORT}`))
