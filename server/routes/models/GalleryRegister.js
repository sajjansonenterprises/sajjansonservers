const mongoose= require("mongoose")
const imageSchema = new mongoose.Schema({
    filePath: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const GalleryRegister = mongoose.model('Gallery', imageSchema);
  module.exports=GalleryRegister