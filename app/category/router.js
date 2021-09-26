const express = require("express");
const router = express.Router();
const Category = require("./controller");

router.get("/", Category.index);

module.exports = router;
