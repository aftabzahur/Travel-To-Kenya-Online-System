'use strict';

var express = require('express');
var kraken = require('kraken-js');
var nodemailer = require('nodemailer');
var flash = require('connect-flash');
var db = require('./lib/db')
var wkhtmltopdf = require('wkhtmltopdf');
// If you don't have wkhtmltopdf in the PATH, then provide
// the path to the executable (in this case for windows would be):



/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'aftabzahur@gmail.com',
        pass: ''
    },
    tls: {rejectUnauthorized: false},
    debug:true
});

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        db.config(config.get('databaseConfig'))
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

//Connect-Flash
app.use(flash());
app.use(function (req, res, next) {
    var messages = require('express-messages')(req, res);
    res.locals.messages = function(chunk, context, bodies, params){
        return chunk.write(messages());
    };
    next();
});

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
