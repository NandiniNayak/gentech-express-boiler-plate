const express = require("express");
const router = express.Router();
const PageController = require("../controllers/page_controller");
const AuthController = require("../controllers/auth_controller");
const { authRedirect, authorize } = require("../middleware/auth_middleware");

router.get("/", PageController.index);

router.get("/register", authRedirect, AuthController.registerNew);
router.post("/register", AuthController.registerCreate );

router.get("/login", AuthController.loginNew);
// router.post("/login", AuthController.loginCreate);

// use passport local startegy on login
router.get("/login", passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}))

router.get("/logout", AuthController.logout);
router.get("/dashboard", authorize, PageController.dashboard);

module.exports = router;