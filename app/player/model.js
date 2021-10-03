const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email harus diisi"],
  },
  name: {
    type: String,
    required: [true, "Nama harus diisi"],
    maxlength: [225, "Nama harus antara 3 - 225 karakter"],
    minlength: [3, "Nama harus antara 3 - 225 karakter"],
  },
  username: {
    type: String,
    required: [true, "Username harus diisi"],
    maxlength: [225, "Nama harus antara 3 - 225 karakter"],
    minlength: [3, "Nama harus antara 3 - 225 karakter"],
  },
  password: {
    type: String,
    required: [true, "Kata sandi harus diisi"],
    maxlength: [225, "Panjang password maksimal 255 karakter"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  avatar: { type: String },
  fileName: { type: String },
  phoneNumber: {
    type: String,
    required: [true, "Nomor telepon harus diisi"],
    maxlength: [13, "Nomor telepon antara 9 - 13 karakter"],
    minlength: [9, "Nomor telepon antara 9 - 13 karakter"],
  },
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
