const mongoose = require('mongoose');

const username = 'chakritamoz'
const password = encodeURIComponent('Ch@kr1t@m0z0');
const cluster = 'cluster0.vc2z3cl.mongodb.net';
const dbName = 'myDB';
const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`Database is connected`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
