module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", { title: "Dashboard", user: req.session.user });
    } catch (error) {
      console.log(error);
    }
  },
};
