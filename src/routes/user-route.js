const express = require("express");
const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.patch(
  "/",
  // upload.fields([{ name: "fullName" }, { name: "email" }]),
  userController.updateProfile
);

module.exports = router;
