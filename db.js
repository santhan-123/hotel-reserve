const mongoose = require('mongoose');

// Your MongoDB URL
const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
module.exports = mongoose;
