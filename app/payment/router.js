const express = require("express");
const router = express.Router();
const { index, create, store, edit, update } = require("./controller");

router.get("/", index);
router.get("/create", create);
router.post("/create", store);
router.get("/edit/:id", edit);
router.put("/edit", update);
// router.delete("/destroy/:id", destroy);

module.exports = router;
