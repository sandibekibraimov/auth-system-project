const mongoose = require('mongoose');

const URI =
  'mongodb+srv://admin:adminLion@cluster0.82scn.mongodb.net/authDB?retryWrites=true&w=majority';

async function dbConnect() {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoDB is connected!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;
