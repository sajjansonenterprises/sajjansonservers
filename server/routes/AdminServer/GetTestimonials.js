
const express = require('express');
const mongoose = require('mongoose');
const TestimonialRegister = require('../models/TestimonialRegister');
const GetTestimonials= express.Router()

  
  // POST route to handle form submission
  GetTestimonials.post('/', async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
      }
  
      const newItem = new TestimonialRegister({
        name,
        description,
      });
  
      await newItem.save();
      res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while saving the item' });
    }
  });
  
module.exports=GetTestimonials