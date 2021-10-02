const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      const payments = await Payment.find().populate("banks");
      res.render("admin/payment/index", {
        title: "Payment",
        payments,
        alert,
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  create: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      res.render("admin/payment/create", {
        title: "Payment",
        alert,
        banks: await Bank.find(),
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  store: async (req, res) => {
    try {
      const { type, banks } = req.body;
      await Payment.create({ type, banks });
      req.flash("alertMessage", "Berhasil tambah data");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment/create");
    }
  },

  edit: async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id).populate("banks");
      const banks = await Bank.find();
      res.render("admin/payment/edit", { payment, title: "Payment", banks });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  update: async (req, res) => {
    try {
      const { id, type, banks } = req.body;
      await Payment.findByIdAndUpdate(id, { type, banks });
      req.flash("alertMessage", "Berhasil ubah data");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  destroy: async (req, res) => {
    try {
      await Payment.findByIdAndDelete(req.params.id);
      req.flash("alertMessage", "Berhasil hapus data");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
