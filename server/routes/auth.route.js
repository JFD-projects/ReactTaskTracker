const express = require("express");
const verifySignUp = require("../middleware/verifySignUp");

const router = express.Router();

const controller = require("../controllers/auth.controller");
const authJwt = require("../middleware/authJwt");
const {signUpValidations} = require("../middleware/validators/auth");

router.post("/signup", [verifySignUp.checkDuplicateEmail, ...signUpValidations], controller.signUp);
router.post("/signin", controller.signIn);
router.post("/logout", controller.revokeToken);
router.post("/refreshToken", [authJwt.verifyRefreshToken], controller.refreshToken);
router.post("/restorePassword", controller.restorePassword);
router.post("/setPassword", controller.setPassword);

module.exports = router;
