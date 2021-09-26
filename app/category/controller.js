const { findByIdAndDelete } = require("./model");
const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      const categories = await Category.find();
      res.render("admin/category/index", {
        title: "StoreGG",
        categories,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  create: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  store: async (req, res) => {
    try {
      await Category.create({ name: req.body.name });
      req.flash("alertMessage", "Berhasil tambah data");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  edit: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.render("admin/category/edit", { category });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  update: async (req, res) => {
    try {
      await Category.findByIdAndUpdate(req.body.id, { name: req.body.name });
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  destroy: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
