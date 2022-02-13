const db = require("../models");
const User = db.user;

exports.isAdmin = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user?.isAdmin) {
      res.status(403).send({
        message: "Forbidden",
      });
      return;
    }

    next();
  });
};