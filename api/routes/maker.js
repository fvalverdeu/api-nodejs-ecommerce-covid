const express = require("express");
const router = express.Router();

const MakerController = require('../controllers/maker');

/**
 * @swagger
 * /maker:
 *   get:
 *     summary: Obtiene todos los fabricantes
 *     tags: [Fabricantes]
 *     responses:
 *       200:
 *         description: Lista de todos los fabricantes
 */
router.get("/", MakerController.getAll);

/**
 * @swagger
 * /maker:
 *   post:
 *     summary: Crea un nuevo fabricante
 *     tags: [Fabricantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fabricante creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", MakerController.create);

/**
 * @swagger
 * /maker/{id}:
 *   get:
 *     summary: Obtiene un fabricante por ID
 *     tags: [Fabricantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del fabricante
 *     responses:
 *       200:
 *         description: Fabricante encontrado
 *       404:
 *         description: Fabricante no encontrado
 */
router.get("/:id", MakerController.get);

/**
 * @swagger
 * /maker/{id}:
 *   put:
 *     summary: Actualiza un fabricante
 *     tags: [Fabricantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del fabricante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fabricante actualizado exitosamente
 *       404:
 *         description: Fabricante no encontrado
 */
router.put("/:id", MakerController.update);

/**
 * @swagger
 * /maker/{id}:
 *   delete:
 *     summary: Elimina un fabricante
 *     tags: [Fabricantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del fabricante
 *     responses:
 *       200:
 *         description: Fabricante eliminado exitosamente
 *       404:
 *         description: Fabricante no encontrado
 */
router.delete("/:id", MakerController.delete);

/**
 * @swagger
 * /maker/page/{limit}/{skip}:
 *   post:
 *     summary: Obtiene fabricantes con paginación
 *     tags: [Fabricantes]
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
 *         description: Fabricantes paginados
 */
router.post("/page/:limit/:skip", MakerController.getAllPaginate);

module.exports = router;
