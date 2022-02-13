const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/isAdmin");

const StatController = require("../controllers/stat.controller");
const authJwt = require("../middleware/authJwt");

router.get(
  "/tasks",
  [authJwt.verifyToken, isAdmin],
  StatController.getTasksStat
);

module.exports = router;
