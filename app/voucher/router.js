const express = require("express");
const router = express.Router();
const {
  index,
  create,
  store,
  edit,
  update,
  destroy,
  statusUpdate,
} = require("./controller");
const multer = require("multer");
const os = require("os");
const { isLoginAdmin } = require("../middlewares/auth");

router.use(isLoginAdmin);

router.get("/", index);
router.get("/create", create);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), store);
router.get("/edit/:id", edit);
router.put("/edit", multer({ dest: os.tmpdir() }).single("image"), update);
router.delete("/destroy/:id", destroy);
router.put("/status/:id", statusUpdate);

module.exports = router;
