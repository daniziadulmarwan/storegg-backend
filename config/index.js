const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  service_name: process.env.SERVICE_NAME,
  mongo_url: process.env.MONGO_LOCAL_URL,
};
