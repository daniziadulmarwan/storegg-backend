const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Category.find();
      res.render("admin/category/index", { title: "StoreGG", categories });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      await Category.create({ name: req.body.name });
      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.render("admin/category/edit", { category });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      await Category.findByIdAndUpdate(req.body.id, { name: req.body.name });
      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },
};
