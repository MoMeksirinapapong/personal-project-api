const express = require("express");

const authController = require("../controllers/auth-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", authController.register);
// #router register will run at authController.register
router.post("/login", authController.login);
router.get("/user", authenticateMiddleware, authController.getMe);
router.patch("/updateUser", authenticateMiddleware, authController.updateUser);
router.patch("/note", authenticateMiddleware, authController.note);
// router.post("/create");

module.exports = router;
