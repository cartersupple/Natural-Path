const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/NaturalPath",
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
