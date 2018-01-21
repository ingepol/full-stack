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

    HotelSchema.query.byStars = function(stars) {
      var arrayStar = JSON.parse("[" + stars + "]");
      return this.find({ stars: {$in:arrayStar} });
    };

    HotelSchema.query.byNameAndStars = function(name,stars) {
      var arrayStar = JSON.parse("[" + stars + "]");
      return this.find({
      $and: [
         { name: new RegExp(name, 'i') },
         { stars: {$in:arrayStar} }
      ]});
   };

    return db.model('hotel', HotelSchema);
}
