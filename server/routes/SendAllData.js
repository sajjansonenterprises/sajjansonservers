var express = require('express');
const MillCardRegister = require('./models/MillCardRegister');
var SendAllData = express.Router();
const mongoose= require("mongoose");
const GalleryRegister = require('./models/GalleryRegister');
const TestimonialRegister = require('./models/TestimonialRegister');
const CarousalRegister = require('./models/CarousalRegister');
/* GET users listing. */


  
SendAllData.get('/',async function(req, res, next) {
  try {
    const millData = await MillCardRegister.find({})
const galleryData = await GalleryRegister.find({})
const testimonialData = await TestimonialRegister.find({})
const carousalData = await CarousalRegister.find({})
console.log(testimonialData)
setTimeout(() => {
  res.json({millData,galleryData,testimonialData,carousalData});
    
}, 2000);
  } catch (error) {
    console.log("err at sendalldata",error)
  }

});

module.exports = SendAllData;
