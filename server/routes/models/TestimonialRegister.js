const mongoose= require("mongoose")
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
  });
  
  const TestimonialRegister = mongoose.model('Testimonial', itemSchema);
  module.exports=TestimonialRegister
