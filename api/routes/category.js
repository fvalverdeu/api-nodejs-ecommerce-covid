const express = require("express");
const router = express.Router();

const CategoryController = require('../controllers/category');

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de todas las categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", CategoryController.getAll);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", CategoryController.create);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", CategoryController.get);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Actualiza una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/:id", CategoryController.update);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:id", CategoryController.delete);

/**
 * @swagger
 * /category/main/list:
 *   get:
 *     summary: Obtiene las categorías principales
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías principales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/main/list", CategoryController.getMain);

/**
 * @swagger
 * /category/page/{limit}/{skip}:
 *   post:
 *     summary: Obtiene categorías con paginación
 *     tags: [Categorías]
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
 *         description: Categorías paginadas
 */
router.post("/page/:limit/:skip", CategoryController.getAllPaginate);

module.exports = router;
