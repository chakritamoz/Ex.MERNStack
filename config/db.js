const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `${process.env.DB_SERVER}//${process.env.DB_USERNAME}:${password}@${process.env.DB_CLUSTER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`Database is connected`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
