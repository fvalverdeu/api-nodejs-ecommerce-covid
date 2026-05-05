const express = require("express");
const router = express.Router();

const PreparationController = require('../../controllers/preparation');

/**
 * @swagger
 * /preparation:
 *   get:
 *     summary: Obtiene todas las preparaciones
 *     tags: [Preparaciones]
 *     responses:
 *       200:
 *         description: Lista de todas las preparaciones
 */
router.get("/", PreparationController.getAll);

/**
 * @swagger
 * /preparation:
 *   post:
 *     summary: Crea una nueva preparación
 *     tags: [Preparaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Preparación creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", PreparationController.create);

/**
 * @swagger
 * /preparation/{id}:
 *   get:
 *     summary: Obtiene una preparación por ID
 *     tags: [Preparaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la preparación
 *     responses:
 *       200:
 *         description: Preparación encontrada
 *       404:
 *         description: Preparación no encontrada
 */
router.get("/:id", PreparationController.get);

/**
 * @swagger
 * /preparation/{id}:
 *   put:
 *     summary: Actualiza una preparación
 *     tags: [Preparaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la preparación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Preparación actualizada exitosamente
 *       404:
 *         description: Preparación no encontrada
 */
router.put("/:id", PreparationController.update);

/**
 * @swagger
 * /preparation/{id}:
 *   delete:
 *     summary: Elimina una preparación
 *     tags: [Preparaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la preparación
 *     responses:
 *       200:
 *         description: Preparación eliminada exitosamente
 *       404:
 *         description: Preparación no encontrada
 */
router.delete("/:id", PreparationController.delete);

module.exports = router;
