const mongoose = require("mongoose");
let bankSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama pemilik harus diisi"],
  },
  bankName: {
    type: String,
    required: [true, "Nama bank harus diisi"],
  },
  rekeningNumber: {
    type: String,
    required: [true, "Nomor rekening harus diisi"],
  },
});

module.exports = mongoose.model("Bank", bankSchema);
