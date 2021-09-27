const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      const vouchers = await Voucher.find();
      res.render("admin/voucher/index", {
        title: "Voucher",
        vouchers,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  create: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      const categories = await Category.find();
      const nominals = await Nominal.find();
      res.render("admin/voucher/create", {
        alert,
        title: "Voucher",
        categories,
        nominals,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
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

  // edit: async (req, res) => {
  //   try {
  //     const nominal = await Nominal.findById(req.params.id);
  //     res.render("admin/nominal/edit", { nominal });
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },

  // update: async (req, res) => {
  //   try {
  //     const { id, coinName, coinQuantity, price } = req.body;
  //     await Nominal.findByIdAndUpdate(req.body.id, {
  //       coinName,
  //       coinQuantity,
  //       price,
  //     });
  //     req.flash("alertMessage", "Berhasil ubah data");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },

  // destroy: async (req, res) => {
  //   try {
  //     await Nominal.findByIdAndDelete(req.params.id);
  //     req.flash("alertMessage", "Berhasil hapus data");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },
};
