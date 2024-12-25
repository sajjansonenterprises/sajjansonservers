const express= require("express")
const multer = require('multer');
const path = require('path');
const GetGallery= express.Router()
const mongoose = require('mongoose');
const GalleryRegister = require("../models/GalleryRegister");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'galleryupload/'); // Store in 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
    }
  });
  
  const upload = multer({ storage });
  
  // Mongoose Schema for Image

  
  // POST route to handle image upload
  GetGallery.post('/', upload.single('image'), async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
  
      // Save file path to database
      const newImage = new GalleryRegister({
        filePath: `http://localhost:3000/${req.file.path}`,
      });
  
      await newImage.save();
  
      res.status(200).json({
        message: 'File uploaded successfully',
        filePath: `http://localhost:3000/${newImage.filePath}`,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send('Error uploading image');
    }
  });
module.exports=GetGallery