const express = require("express");
const router = express.Router();

const Controller = require("../controllers/column.controller");
const authJwt = require("../middleware/authJwt");

router.get("/", [authJwt.verifyToken], Controller.getList);

module.exports = router;
