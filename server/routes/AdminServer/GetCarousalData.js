const express =require("express")
const GetCarousalData= express.Router()
const multer = require('multer');
const path = require('path');
const CarousalRegister = require("../models/CarousalRegister");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'carousal/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Store with timestamp
    }
  });
  
  const upload = multer({ storage: storage });
  
GetCarousalData.post('/', upload.single('image'), async(req, res) => {
    try {
        const { caption, paragraph } = req.body;
        const image = req.file ? req.file.filename : null;
      
        if (!caption || !paragraph || !image) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        const newForm = new CarousalRegister({
            caption,
            paragraph,
            image:`http://localhost:3000/${req.file.path}`,  // Store the image file name (not the file itself)
          });
      
          // Save to MongoDB
          await newForm.save();
      
        // Handle storing the form data here (e.g., saving to database)
        console.log('Form data received:', { caption, paragraph, image });
      
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.log(error)
    }
  
  });
module.exports=GetCarousalData