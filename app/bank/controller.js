const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      const banks = await Bank.find();
      res.render("admin/bank/index", {
        title: "Bank",
        banks,
        alert,
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  create: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      res.render("admin/bank/create", {
        title: "Bank",
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  store: async (req, res) => {
    try {
      const { name, bankName, rekeningNumber } = req.body;
      await Bank.create({ name, bankName, rekeningNumber });
      req.flash("alertMessage", "Berhasil tambah data");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank/create");
    }
  },

  edit: async (req, res) => {
    try {
      const bank = await Bank.findById(req.params.id);
      res.render("admin/bank/edit", { bank, title: "Bank" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  update: async (req, res) => {
    try {
      const { id, name, bankName, rekeningNumber } = req.body;
      await Bank.findByIdAndUpdate(id, { name, bankName, rekeningNumber });
      req.flash("alertMessage", "Berhasil ubah data");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  destroy: async (req, res) => {
    try {
      await Bank.findByIdAndDelete(req.params.id);
      req.flash("alertMessage", "Berhasil hapus data");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
