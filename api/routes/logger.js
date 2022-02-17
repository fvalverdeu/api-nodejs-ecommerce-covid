const express = require("express");
const router = express.Router();

const LoggerController = require('../controllers/logger');

router.get("/", LoggerController.getAll);

router.post("/", LoggerController.create);

router.get("/:id", LoggerController.get);

router.delete("/:id", LoggerController.delete);

module.exports = router;
