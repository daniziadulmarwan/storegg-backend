const express = require("express");
const router = express.Router();
const { index, create, store } = require("./controller");
const multer = require("multer");
const os = require("os");

router.get("/", index);
router.get("/create", create);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), store);
// router.get("/edit/:id", edit);
// router.put("/edit", update);
// router.delete("/destroy/:id", destroy);

module.exports = router;
