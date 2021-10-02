const User = require("./model");
const bcrypt = require("bcrypt");

module.exports = {
  viewSignin: (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/user/index", {
          title: "Sign in",
          alert,
        });
      } else {
        res.redirect("/dashboard");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        if (user.status === "Y") {
          const checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            req.session.user = {
              id: user._id,
              email: user.email,
              status: user.status,
              name: user.name,
            };
            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", `Kata sandi tidak valid`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash("alertMessage", `User belum aktif`);
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `User tidak valid`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },

  actionSignout: (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
