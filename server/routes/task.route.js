const express = require("express");
const router = express.Router();

const Controller = require("../controllers/task.controller");
const authJwt = require("../middleware/authJwt");

router.get("/",[authJwt.verifyToken], Controller.getList);
router.get("/:id",[authJwt.verifyToken], Controller.get);
router.post("/",[authJwt.verifyToken], Controller.add);
router.put("/:id",[authJwt.verifyToken], Controller.update);
router.delete("/:id",[authJwt.verifyToken], Controller.delete);

module.exports = router;
