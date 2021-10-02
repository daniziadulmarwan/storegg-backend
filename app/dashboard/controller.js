const Transaction = require("../transaction/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Player = require("../player/model");

module.exports = {
  index: async (req, res) => {
    try {
      let transaction = await Transaction.countDocuments();
      let voucher = await Voucher.countDocuments();
      let category = await Category.countDocuments();
      let player = await Player.countDocuments();
      res.render("admin/dashboard/index", {
        title: "Dashboard",
        user: req.session.user,
        count: {
          transaction,
          voucher,
          category,
          player,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
