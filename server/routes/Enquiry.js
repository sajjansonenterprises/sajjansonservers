
var express = require('express');
const EnquiryRegister = require('./models/EnquiryRegister');
var Enquiry = express.Router();

// POST route to handle new enquiries
Enquiry.post('/', async (req, res) => {
  console.log("hiiiiii")
  const { name, subject, email, message } = req.body;

  // Validate incoming data
  if (!name || !subject) {
    return res.status(400).json({ error: 'Name and subject are required' });
  }

  try {
    // Create a new enquiry document
    const newEnquiry = new EnquiryRegister({
      name,
      subject,
      email,
      message,
    });

    // Save the enquiry to the database
    await newEnquiry.save();

    res.status(201).json({
      message: 'Thank you for your message. We will get back to you shortly!',
    });
  } catch (error) {
    console.error('Error saving enquiry:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = Enquiry;
