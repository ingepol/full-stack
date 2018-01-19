'use strict'

/**
  Controller that contains the logic of the methods to create,
  read, update and delete hotels
*/

const Hotel = require('../models/hotel')();
const ObjectId = require('mongoose').Types.ObjectId;
const config = require('./../config-module').config();
const hotelsJson = require("../data/data.json");

/**
  Method to obtain all the hotels
  @exception hotels were not found
  @return List of hotels
*/
function getHotels(req, res){
  console.log('GET /api/hotel');
  if(config.dataJson){
    return res.status(200).send({ hotelsJson });
  }
  Hotel.find({}, (err, hotels) => {
    if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`});
    if(!hotels) return res.status(404).send({message:'No existen hoteles.'});
    res.status(200).send({ hotels });
  });
}

/**
  Method to obtain a hotel for its id
  @exception hotel was not found
  @param hotelId
*/

function getHotel(req, res){
  console.log('GET /api/hotel/accionsbyid/:hotelId');
  let hotelId = req.params.hotelId;
  if(config.dataJson){
    let hotel = hotelsJson.filter(function(elem) {
      return elem.id == hotelId;
    });
    if(hotel.length === 0) return res.status(404).send({message:'El hotel no existe.'});
    return res.status(200).send({hotel:hotel});
  }
	if (!ObjectId.isValid(hotelId)) return res.status(500).send({message:"Id invalido"});
  Hotel.findById(hotelId, (err, hotel) => {
    if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`});
    if(!hotel) return res.status(404).send({message:'El hotel no existe.'});
    res.status(200).send({ hotel });
  });
}

/**
  Method that searches for hotels by name
  @param name
  @exception hotels were not found
  @return List of hotels
*/
function searchHotels(req, res){
  console.log('GET /api/hotel/search/:name');
  let search = req.params.name;
  if(config.dataJson){
    let hotels = hotelsJson.filter(function(elem) {
      return elem.name.toLowerCase().indexOf(search.toLowerCase())>-1;
    });
    if(hotels.length === 0) return res.status(404).send({message:'No se encontraron hoteles.'});
    return res.status(200).send({hotels})
  }
  //let regex = {'name' : new RegExp(search, 'i')}, query = { description: regex };

  Hotel.find().byName(search).exec(function(err, hotels) {
    if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`});
    if(hotels.length === 0) return res.status(404).send({message:'No se encontraron hoteles.'});
      res.status(200).send({ hotels });
    });
}

/**
  Method that creates a hotel
*/
function saveHotel(req, res){
  console.log('POST /api/hotel');
  console.log(req.body);
  let hotel = new Hotel(req.body);
  hotel.save((err, hotelStored)=>{
    if(err) res.status(500).send({message:`Error al guardar en la base de datos ${err}`});
    res.status(200).send({hotel:hotelStored});
  });
}

/**
  Method that updates a hotel
  @param hotelId
  @exception hotel was not found
*/
function updateHotel(req, res){
  console.log('PUT /api/hotel/accionsbyid/:hotelId');
  let hotelId = req.params.hotelId;
  let update = req.body;
  if (!ObjectId.isValid(hotelId)) return res.status(500).send({message:"Id invalido"});
  Hotel.findOneAndUpdate({"_id": hotelId}, update, (err, hotelUpdated) => {
    if(err) res.status(500).send({message:`Error al actualizar el hotel ${err}`});
    if(!hotelUpdated) return res.status(404).send({message:'El hotel no existe.'});
    res.status(200).send({ message: 'El hotel ha sido actualizado.'});
  });
}


/**
  Method that removes a hotel
  @param hotelId
  @exception hotel was not found
*/
function deleteHotel(req, res){
  console.log('DELETE /api/hotel/accionsbyid/:hotelId');
  let hotelId = req.params.hotelId;
  if (!ObjectId.isValid(hotelId)) return res.status(500).send({message:"Id invalido"});
  Hotel.findById(hotelId, (err, hotel) => {
    if(err) res.status(500).send({message:`Error al borrar el hotel ${err}`});
    if(!hotel) return res.status(404).send({message:'El hotel no existe.'});
    hotel.remove(err => {
      if(err) res.status(500).send({message:`Error al borrar el hotel ${err}`});
      res.status(200).send({ message: 'El hotel ha sido eliminado.'});
    });
  });
}

module.exports = {
  getHotel,
	getHotels,
  searchHotels,
	saveHotel,
	updateHotel,
	deleteHotel
}
