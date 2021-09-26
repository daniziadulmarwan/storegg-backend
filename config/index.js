const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  service_name: process.env.SERVICE_NAME,
  mongo_url: process.env.MONGO_LOCAL_URL,
};
