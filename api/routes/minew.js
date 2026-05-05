const express = require("express");
const router = express.Router();

const MinewController = require('../controllers/minew');

/**
 * @swagger
 * /minew:
 *   get:
 *     summary: Obtiene todos los registros Minew
 *     tags: [Minew]
 *     responses:
 *       200:
 *         description: Lista de todos los registros Minew
 */
router.get("/", MinewController.getAll);

/**
 * @swagger
 * /minew:
 *   post:
 *     summary: Crea un nuevo registro Minew
 *     tags: [Minew]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Registro Minew creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", MinewController.create);

/**
 * @swagger
 * /minew/{id}:
 *   get:
 *     summary: Obtiene un registro Minew por ID
 *     tags: [Minew]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro Minew
 *     responses:
 *       200:
 *         description: Registro Minew encontrado
 *       404:
 *         description: Registro Minew no encontrado
 */
router.get("/:id", MinewController.get);

module.exports = router;
