
const mongoose = require('mongoose');

// Define the schema for the MillCard
const millCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Title is required
  },
  subject: {
    type: String,
    required: true, // Content is required
  },
  email: {
    type: String,
    required: false, // Thumbnail URL is optional (it may not always be provided)
  },
    message: {
    type: String,
    required: false, // Thumbnail URL is optional (it may not always be provided)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Store the date the document was created
  },
});

// Create and export the model
const EnquiryRegister = mongoose.model('MillCard', millCardSchema);
module.exports = EnquiryRegister;
