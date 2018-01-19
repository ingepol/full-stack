'use strict'

/**
  This file configures the routes that will be used for hotel
  management (Create, Read, Update and Delete - CRUD) and exposes them
*/

const express = require('express');
const hotelCtrl = require('../controllers/hotelCtrl');
const api = express.Router();

api.route("/hotel/searchHotels/:name")
  .get(hotelCtrl.searchHotels);

api.route("/hotel")
  .get(hotelCtrl.getHotels)
  .post(hotelCtrl.saveHotel);

api.route('/hotel/accionsbyid/:hotelId')
  .get(hotelCtrl.getHotel)
  .put(hotelCtrl.updateHotel)
  .delete(hotelCtrl.deleteHotel);



module.exports = api;
