#!/usr/bin/env node

/*
*  server-byrslf
*
*  Authors:
*	Simone Faggi
*
*/

var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./routes/main');
var jwt = require('jsonwebtoken');

app = express();

app.disable('x-powered-by');
app.use(logger('dev')); /* HTTP request log */
app.use(bodyParser.urlencoded({ extended: true })); /* Automatic body parser */
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); /* Public folder is served staticaly */


/* To check and decode the access token by JsonWebToken */
app.use('/api', function(req,res,next){
  var token = req.headers['x-access-token'];
  /* If the access token is valid, its decryption will be stored  */
  jwt.verify(token, 'cavallosolo', function(err, decoded) {
    if (err) {
      req.decoded = false;
      next();
    } else {
      req.decoded = decoded;
      next();
    }
  });
});

app.use('/api', api); /* redirect to routes */
app.use('/*', express.static(path.join(__dirname, 'public')));

var server = app.listen(8000, "0.0.0.0", function () {
  console.log('BYRSLF listening on port ' + server.address().port + ' hosting at ' + server.address().address);
});

module.exports = app;
