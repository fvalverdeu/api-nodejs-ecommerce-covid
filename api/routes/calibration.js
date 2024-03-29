const express = require("express");
const router = express.Router();

const CalibrationController = require('../controllers/calibration');

router.get("/", CalibrationController.getAll);

router.post("/", CalibrationController.create);

router.get("/:id", CalibrationController.get);

router.post("/filter", CalibrationController.getFilterByDate);

module.exports = router;
