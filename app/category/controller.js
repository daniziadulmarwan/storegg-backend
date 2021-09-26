class Category {
  async index(req, res) {
    try {
      res.render("admin/category/view_category", { title: "StoreGG" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Category();
