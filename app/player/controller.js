const Player = require("./model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const Payment = require("../payment/model");
const Bank = require("../bank/model");

module.exports = {
  landingPage: async (req, res) => {
    try {
      let voucher = await Voucher.find()
        .select("id name status category thumbnail")
        .populate("category");
      res.status(200).json({ data: voucher });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      let voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals")
        .populate("user", "_id name phoneNumber");

      if (!voucher) {
        return res.status(404).json({ message: "voucher not found" });
      }

      res.status(200).json({ data: voucher });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  },

  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  },

  checkout: async (req, res) => {
    try {
      const { accountUser, name, nominal, voucher, payment, bank } = req.body;

      const res_voucher = await Voucher.findOne({ _id: voucher })
        .select("_id name category thumnail user")
        .populate("category")
        .populate("user");
      if (!res_voucher)
        res.status(404).json({ message: "Voucher game not found" });

      const res_nominal = await Nominal.findOne({ _id: nominal });
      if (!res_nominal)
        res.status(404).json({ message: "Nominal game not found" });

      const res_payment = await Payment.findOne({ _id: payment });
      if (!res_payment)
        res.status(404).json({ message: "Payment game not found" });

      const res_bank = await Bank.findOne({ _id: bank });
      if (!res_bank) res.status(404).json({ message: "Bank not found" });

      // insert data
      const payload = {
        historyVoucherTopup: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category ?? "-",
          thumbnail: res_voucher._doc.thumbnail,
          coinName: res_nominal._doc.coinName,
          coinQuantity: res_nominal._doc.coinQuantity,
          price: res_nominal._doc.price,
        },
        historyPayment: {
          name: res_payment._doc.name,
          type: res_payment._doc.type,
          bankName: res_payment._doc.bankName,
          rekeningNumber: res_payment._doc.rekeningNumber,
        },
      };
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  },
};
