const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body;

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
            let player = new Player({ ...payload, avatar: filename });
            await player.save();
            delete player._doc.password;
            res.status(201).json({
              data: player,
            });
          } catch (error) {
            if (error && error.name === "ValidationError") {
              return res.status(422).json({
                error: 1,
                message: error.message,
                fields: error.error,
              });
            }
            next(error);
          }
        });
      } else {
        let player = new Player(payload);
        await player.save();
        delete player._doc.password;
        res.status(201).json({
          data: player,
        });
      }
    } catch (error) {
      if (error && error.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: error.message,
          fields: error.error,
        });
      }
      next(error);
    }
  },

  signin: (req, res) => {
    const { email, password } = req.body;
    Player.findOne({ email: email })
      .then((player) => {
        if (player) {
          let checkPassword = bcrypt.compareSync(password, player.password);
          if (checkPassword) {
            const token = jwt.sign(
              {
                player: {
                  id: player.id,
                  name: player.name,
                  username: player.username,
                  email: player.email,
                  phoneNumber: player.phoneNumber,
                  avatar: player.avatar,
                },
              },
              config.jwtKey
            );
            res.status(200).json({ data: { token } });
          } else {
            res.status(403).json({ message: "Incorrect password" });
          }
        } else {
          res.status(403).json({ message: "Incorrect user" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: error.message || "Internal server error" });
        next();
      });
  },
};
