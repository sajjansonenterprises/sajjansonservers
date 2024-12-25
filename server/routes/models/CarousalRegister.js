const mongoose = require('mongoose');

// Define the schema for the form data
const formSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    image: {
      type: String,  // We store the file path here (e.g., the image file name)
      required: true,
    },
  },
  { timestamps: true }  // Automatically add createdAt and updatedAt fields
);

// Create the model from the schema
const CarousalRegister = mongoose.model('Carousal', formSchema);

module.exports = CarousalRegister;
