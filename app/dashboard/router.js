const express = require("express");
const router = express.Router();
const { index } = require("./controller");
const { isLoginAdmin } = require("../middlewares/auth");

router.use(isLoginAdmin);
router.get("/", index);

module.exports = router;
