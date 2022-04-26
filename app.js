const createError = require('http-errors');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Gives us access to variable set in the .env file via `process.env.VARIABLE_NAME`
require('dotenv').config();

/** DATABASE */
// Import the DB that configure and open a global connection 
require('./conf/db');

// Mongoose models
require('./models/user');


// Require: Routers
const authRoute = require('./routes/auth/');

// Intantiate new app
var app = express();





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Routes
app.get('/', (req, res, next) => {
    return res.status(200).json({message: 'Welcome'});
});
app.use('/auth', authRoute);

// Catch the 404 and forward error 
app.use( (req, res, next) => {
    return next(createError(404));
});


// Error handler
app.use( (err, req, res, next) => {
    return res.status(500).send(err.message);
});

module.exports = app;