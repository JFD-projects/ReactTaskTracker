const express = require("express");
const verifySignUp = require("../middleware/verifySignUp");

const router = express.Router();

const controller = require("../controllers/auth.controller");
const authJwt = require("../middleware/authJwt");

router.post("/signup", [verifySignUp.checkDuplicateEmail], controller.signUp);
router.post("/signin", controller.signIn);
router.get("/logout", controller.revokeToken);
router.post("/refreshToken",[authJwt.verifyRefreshToken], controller.refreshToken);

module.exports = router;
