'use strict'
/**
  This file is responsible for exposing the connection of the database
*/
const mongoose = require('mongoose');
const config = require('./../config-module').config()
mongoose.Promise = global.Promise;

let db;

mongoose.connect(config.db, (err, res) => {
  if(err) {
    throw console.log(`Error al conectar a la base de datos: ${err}`);
  }
});

module.exports = mongoose;
