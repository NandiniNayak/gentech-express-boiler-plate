const express = require("express");
const router = express.Router();
const PageController = require("../controllers/page_controller");
const AuthController = require("../controllers/auth_controller");
const authRedirect = require("../middleware/auth_middleware");

router.get("/", PageController.index);

router.get("/register", authRedirect, AuthController.registerNew);
router.post("/register", AuthController.registerCreate );

router.get("/login", AuthController.loginNew);
router.post("/login", AuthController.loginCreate);

router.get("/logout", AuthController.logout);
router.get("/dashboard", PageController.dashboard);

module.exports = router;