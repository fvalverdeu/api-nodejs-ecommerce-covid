const express = require("express");
const router = express.Router();

const CategoryController = require('../controllers/category');

router.get("/", CategoryController.getAll);

router.post("/", CategoryController.create);

router.get("/:id", CategoryController.get);

router.put("/:id", CategoryController.update);

router.delete("/:id", CategoryController.delete);

router.get("/main/list", CategoryController.getMain);

router.post("/page/:limit/:skip", CategoryController.getAllPaginate);

module.exports = router;
