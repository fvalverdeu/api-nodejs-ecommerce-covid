const express = require("express");
const router = express.Router();
// const upload = require('../middleware/upload');
// const idProtected = require('../middleware/id-protected');
// const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/product');

router.get("/", ProductController.getAll);

router.post("/", ProductController.create);

router.get("/:id", ProductController.get);

router.put("/:id", idProtected, ProductController.update);

router.delete("/:id", idProtected, ProductController.delete);

router.put("/:id/poster", idProtected, upload.image.single('poster'), ProductController.updatePoster);


module.exports = router;
