const express = require("express");
const router = express.Router();

const MakerController = require('../controllers/maker');

router.get("/", MakerController.getAll);

router.post("/", MakerController.create);

router.get("/:id", MakerController.get);

router.put("/:id", MakerController.update);

router.delete("/:id", MakerController.delete);

module.exports = router;
