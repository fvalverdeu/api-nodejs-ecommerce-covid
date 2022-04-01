const express = require("express");
const router = express.Router();

const PreparationController = require('../controllers/preparation');

router.get("/", PreparationController.getAll);

router.post("/", PreparationController.create);

router.get("/:id", PreparationController.get);

router.put("/:id", PreparationController.update);

router.delete("/:id", PreparationController.delete);

module.exports = router;
