
var express = require('express');
const EnquiryRegister = require('./models/EnquiryRegister');
var Enquiry = express.Router();

ContactUs.post('/', async (req, res) => {
    const { name,subject, email, message } = req.body;
  
    // Validate incoming data
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Create a new contact document
      const newContact = new EnquiryRegister({
        name,
          subject,
        email,
        message,
      });
  
      // Save the contact message to the database
      await newContact.save();
  
      res.status(201).json({
        message: 'Thank you for your message. We will get back to you shortly!',
      });
    } catch (error) {
      console.error('Error saving contact message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports = Enquiry;
