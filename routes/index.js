const express = require("express");
const router = express.Router();
const PageController = require("../controllers/page_controller");
const AuthController = require("../controllers/auth_controller");

router.get("/", PageController.index);

router.get("/register", AuthController.registerNew);
router.post("/register", AuthController.registerCreate );

module.exports = router;