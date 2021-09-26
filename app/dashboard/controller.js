module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", { title: "StoreGG" });
    } catch (error) {
      console.log(error);
    }
  },
};
