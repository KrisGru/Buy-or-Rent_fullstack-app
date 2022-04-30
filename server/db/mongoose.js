const mongoose = require('mongoose');
const { database } = require('../config')

const connectDB = () => {
  return mongoose.connect(database)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error(err)
  })
}

module.exports = {connectDB};
