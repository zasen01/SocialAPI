const mongoose = require('mongoose');


var db =  mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/virtualsdb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.set('debug', true);
  
  module.exports = db;