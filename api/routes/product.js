const express = require('express');
const router = express.Router();

const { ProductController } = require('../controllers');
const { upload } = require('../middlewares');

router.get('/', ProductController.getAll);
router.post('/', ProductController.create);
router.get('/:id', ProductController.get);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.put('/:id/image', upload.image.single('image'), ProductController.updateImage);
router.get('/category/:id', ProductController.getByCategory);
router.post('/page/:limit/:skip', ProductController.getAllPaginate);

module.exports = router;
