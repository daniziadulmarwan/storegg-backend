const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      const nominals = await Nominal.find();
      res.render("admin/nominal/index", {
        title: "Nominal",
        nominals,
        alert,
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  create: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      res.render("admin/nominal/create", {
        alert,
        title: "Category",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  store: async (req, res) => {
    try {
      const { coinQuantity, coinName, price } = req.body;
      await Nominal.create({ coinQuantity, coinName, price });
      req.flash("alertMessage", "Berhasil tambah data");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal/create");
    }
  },

  edit: async (req, res) => {
    try {
      const nominal = await Nominal.findById(req.params.id);
      res.render("admin/nominal/edit", {
        nominal,
        title: "Category",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  update: async (req, res) => {
    try {
      const { id, coinName, coinQuantity, price } = req.body;
      await Nominal.findByIdAndUpdate(req.body.id, {
        coinName,
        coinQuantity,
        price,
      });
      req.flash("alertMessage", "Berhasil ubah data");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  destroy: async (req, res) => {
    try {
      await Nominal.findByIdAndDelete(req.params.id);
      req.flash("alertMessage", "Berhasil hapus data");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
};
