const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/upload');
// const idProtected = require('../../middleware/id-protected');
// const checkAuth = require('../../middleware/check-auth');

const ProductController = require('../../controllers/product');

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", ProductController.getAll);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", ProductController.create);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", ProductController.get);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Actualiza un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", ProductController.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", ProductController.delete);

/**
 * @swagger
 * /product/{category}/{id}/image:
 *   put:
 *     summary: Actualiza la imagen de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen actualizada exitosamente
 */
router.put("/:category/:id/image", upload.image.single('image'), ProductController.updateImage);

/**
 * @swagger
 * /product/category/{id}:
 *   get:
 *     summary: Obtiene productos por categoría
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos de la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/category/:id", ProductController.getByCategory);

/**
 * @swagger
 * /product/page/{limit}/{skip}:
 *   post:
 *     summary: Obtiene productos con paginación
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: limit
 *         schema:
 *           type: integer
 *         required: true
 *         description: Límite de resultados
 *       - in: path
 *         name: skip
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de resultados a saltar
 *     responses:
 *       200:
 *         description: Productos paginados
 */
router.post("/page/:limit/:skip", ProductController.getAllPaginate);

module.exports = router;
