class Category {
  async index(req, res) {
    try {
      res.render("index", { title: "StoreGG" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Category();
