const mongoose = require('mongoose');
try {
  mongoose.connect("mongodb+srv://sajjansontest:sajjanson.test.website.password1@rollingmilltest.6ax5m.mongodb.net/?retryWrites=true&w=majority&appName=RollingmillTest", {
 useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
 
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
} catch (error) {

}