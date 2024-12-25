const mongoose = require('mongoose');

// Define the schema for the MillCard
const millCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  content: {
    type: String,
    required: true, // Content is required
  },
  thumbnailUrl: {
    type: String,
    required: false, // Thumbnail URL is optional (it may not always be provided)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Store the date the document was created
  },
});

// Create and export the model
const MillCardRegister = mongoose.model('MillCard', millCardSchema);
module.exports = MillCardRegister;
