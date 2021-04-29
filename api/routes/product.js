const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload');
// const idProtected = require('../middleware/id-protected');
// const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/product');

router.get("/", ProductController.getAll);

router.post("/", ProductController.create);

router.get("/:id", ProductController.get);

router.put("/:id", ProductController.update);

router.delete("/:id", ProductController.delete);

router.put("/:category/:id/image", upload.image.single('image'), ProductController.updateImage);

router.get("/category/:id", ProductController.getByCategory);

router.post("/page/:limit/:skip", ProductController.getAllPaginate);
// router.put("/:id", idProtected, ProductController.update);

// router.delete("/:id", idProtected, ProductController.delete);

// router.put("/:id/image", idProtected, upload.image.single('image'), ProductController.updateImage);


module.exports = router;
