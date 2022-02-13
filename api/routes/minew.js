const express = require("express");
const router = express.Router();

const MinewController = require('../controllers/minew');

router.get("/", MinewController.getAll);

router.post("/", MinewController.create);

router.get("/:id", MinewController.get);

module.exports = router;
