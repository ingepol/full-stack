'use strict'

/**
  Scheme of the hotelsS
*/

const mongoose = require('mongoose');
const db = require('./../libs/connection-db');
const config = require('./../config-module').config();

module.exports = function () {
  var Schema = require('mongoose').Schema;
  const HotelSchema = Schema({
      name: String,
      stars: Number,
      price: { type:Number, default: 0},
      image: String,
      amenities: Array,
      dateCreate: { type:String, default: new Date() },
      dateUpdate: String
    });

    HotelSchema.query.byName = function(name) {
      return this.find({ name: new RegExp(name, 'i') });
    };

    return db.model('hotel', HotelSchema);
}
