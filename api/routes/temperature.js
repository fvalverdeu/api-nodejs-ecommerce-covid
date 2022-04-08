const express = require("express");
const router = express.Router();

const TemperatureController = require('../controllers/temperature');

router.get("/", TemperatureController.getAll);

router.post("/", TemperatureController.create);

router.get("/:id", TemperatureController.get);

router.post("/filter", TemperatureController.getFilterByDate);

module.exports = router;
