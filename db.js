const mongoose = require('mongoose');

// Your MongoDB URL
const mongoURL = 'mongodb+srv://rishi_db:rishi123@cluster0.cbhlk.mongodb.net/hotel-reserve';

mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
module.exports = mongoose;
