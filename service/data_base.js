const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path: './service/config.env'});

const uri = process.env.DATABASE_ACCESS.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connection successful !'))
  .catch(() => console.log('MongoDB connection failed !'));


module.exports = mongoose;