const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { status: alertStatus, message: alertMessage };
      const vouchers = await Voucher.find()
        .populate("category")
        .populate("nominals");
      console.log(vouchers);
      res.render("admin/voucher/index", {
        title: "Voucher",
        vouchers,
        alert,
        user: req.session.user,
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
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  store: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            let voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });
            await voucher.save();
            req.flash("alertMessage", "Berhasil tambah data");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher/create");
          }
        });
      } else {
        let voucher = new Voucher({
          name,
          category,
          nominals,
          thumbnail: filename,
        });
        await voucher.save();
        req.flash("alertMessage", "Berhasil tambah data");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher/create");
    }
  },

  edit: async (req, res) => {
    try {
      console.log(req.body);
      const categories = await Category.find();
      const nominals = await Nominal.find();
      const voucher = await Voucher.findById(req.params.id)
        .populate("category")
        .populate("nominals");
      res.render("admin/voucher/edit", {
        title: "Voucher Edit",
        voucher,
        categories,
        nominals,
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  update: async (req, res) => {
    try {
      const { id, name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const voucher = await Voucher.findById(id);
            let currentImg = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImg)) {
              fs.unlinkSync(currentImg);
            }

            await Voucher.findByIdAndUpdate(id, {
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            req.flash("alertMessage", "Berhasil tambah data");
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        await Voucher.findByIdAndUpdate(id, {
          name,
          category,
          nominals,
        });
        req.flash("alertMessage", "Berhasil ubah data");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  destroy: async (req, res) => {
    try {
      let voucher = await Voucher.findByIdAndDelete(req.params.id);
      let currentImg = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currentImg)) {
        fs.unlinkSync(currentImg);
      }
      req.flash("alertMessage", "Berhasil hapus data");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  statusUpdate: async (req, res) => {
    try {
      const voucher = await Voucher.findById(req.params.id);
      let status = voucher.status === "Y" ? "N" : "Y";
      voucher.status = status;
      await voucher.save();
      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
};
