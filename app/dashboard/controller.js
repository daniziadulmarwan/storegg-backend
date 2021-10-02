const Transaction = require("../transaction/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");

module.exports = {
  index: async (req, res) => {
    try {
      let transaction = await Transaction.countDocuments();
      let voucher = await Voucher.countDocuments();
      let category = await Category.countDocuments();
      res.render("admin/dashboard/index", {
        title: "Dashboard",
        user: req.session.user,
        transaction,
        voucher,
        category,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
