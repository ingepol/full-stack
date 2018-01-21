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
  @param stars always send at least one level of one star or several
              levels separated by comma (1,2,3,4,5)
  @exception hotels were not found
  @return List of hotels
*/
function searchHotels(req, res){
  console.log('GET /api/hotel/search/:name/:stars');
  let name = req.params.name;
  let stars = req.params.stars.split(",");
  if(config.dataJson){
    let hotelsFinal = [];
    let hotels = [];
    if (name!="*") {
      hotels = hotelsJson.filter(function(elem) {
        return elem.name.toLowerCase().indexOf(name.toLowerCase())>-1;
      });
    } else {
      hotels = hotelsJson;
    }

    let hotelsTMP;
    for (let i = 0; i < stars.length; i++) {
      hotelsTMP = hotels.filter(function(elem) {
        return elem.stars == stars[i];
      });
      for (let j = 0; j < hotelsTMP.length; j++) {
        hotelsFinal.push(hotelsTMP[j]);
      }
    }

    if(hotelsFinal.length === 0) return res.status(404).send({message:'No se encontraron hoteles.'});
    return res.status(200).send({hotels : hotelsFinal})
  }

  if (name!="*") {
    Hotel.find().byNameAndStars(name, stars).exec(function(err, hotelsByNameAndStars) {
      if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`});
      if(hotelsByNameAndStars.length === 0) return res.status(404).send({message:'No se encontraron hoteles.'});
      res.status(200).send({ hotels : hotelsByNameAndStars });
    });
  } else {
    Hotel.find().byStars(stars).exec(function(err, hotelsByStars) {
      if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}`});
      if(hotelsByStars.length === 0) return res.status(404).send({message:'No se encontraron hoteles.'});
      res.status(200).send({ hotels : hotelsByStars });
    });
  }
}

/**
  Method that creates a hotel
*/
function saveHotel(req, res){
  console.log('POST /api/hotel');
  console.log(req.body);
  let hotel = new Hotel(req.body);
  hotel.amenities = req.body.amenities.split(',');
  hotel.dateUpdate = new Date();
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
  update.dateUpdate = new Date();
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
