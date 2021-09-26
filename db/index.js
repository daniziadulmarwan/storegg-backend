const mongoose = require("mongoose");
const { mongo_url } = require("../config");

mongoose.connect(mongo_url, {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;
