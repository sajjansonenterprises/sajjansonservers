const mongoose = require('mongoose');

// Define the schema for contact form
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const ContactRegister = mongoose.model('Contact', contactSchema);

module.exports = ContactRegister;
