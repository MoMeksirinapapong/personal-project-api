const express = require("express");
const foodController = require("../controllers/food-controller");
const router = express.Router();

router.get("/table/:foodId", foodController.getTable);

module.exports = router;
