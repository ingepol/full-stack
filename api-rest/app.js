'use strict'
/**
  In this file the application is configured so that it allows to send a
  response in JSON format and indicates the routes required by the API.
*/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const hotelRoutes = require('./routes/hotelRoutes');

var options = {
	origin: '*',
	methods: process.env['ME_CONFIG_READONLY'] ? 'GET,OPTIONS,HEAD' : 'GET,PUT,POST,DELETE,HEAD,OPTIONS',
	headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
};

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', options.origin);
	res.setHeader('Access-Control-Allow-Methods', options.methods);
	res.setHeader('Access-Control-Allow-Headers', options.headers);
	next();
});

app.use('/api', hotelRoutes);

module.exports = app;
