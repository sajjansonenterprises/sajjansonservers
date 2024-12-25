const express = require("express")
const multer = require('multer');

const path = require('path');

const fs = require('fs');

const MillCardRegister = require("../models/MillCardRegister");
const GetAddMillCardData= express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp for the file name
    },
  });

  
  const upload = multer({ storage });

 
  // Make sure the 'uploads' directory exists
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
  
  // API Route to handle form data (title, content, and image upload)
  GetAddMillCardData.post('/', upload.single('thumbnail'),async (req, res) => {
    console.log("check4")
    try {
        const { title, content } = req.body;
        const thumbnail = req.file ? req.file.path : null; // Save the image path if an image was uploaded
      
        if (!title || !content) {
          return res.status(400).json({ error: 'Title and content are required!' });
        }
      console.log(title ,content,thumbnail)
      const newMillCard = new MillCardRegister({
        title,
        content,
        thumbnailUrl:`http://localhost:3000/${thumbnail}`
      });
  
      // Save the document to MongoDB
      await newMillCard.save();
  
        // For simplicity, we are just returning the form data in the response
        // You can save this data to a database like MongoDB or MySQL
        res.json({
          message: 'Form submitted successfully',
          data: {
            title,
            content,
            thumbnail,
          },
        });
    } catch (error) {
        console.log(error)
    }
  
  });
  
  module.exports= GetAddMillCardData