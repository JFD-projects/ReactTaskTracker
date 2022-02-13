const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const taskRoute = require("./task.route");
const columnRoute = require("./column.route");
const statRoute = require("./stat.route");
const router = express.Router({ mergeParams: true });

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/task", taskRoute);
router.use("/column", columnRoute);
router.use("/stat", statRoute);

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/v1", router);
};
