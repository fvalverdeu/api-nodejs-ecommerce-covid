const express = require("express");
const router = express.Router();

const LoggerController = require('../controllers/logger');

/**
 * @swagger
 * /logger:
 *   get:
 *     summary: Obtiene todos los registros de log
 *     tags: [Logger]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de log
 */
router.get("/", LoggerController.getAll);

/**
 * @swagger
 * /logger:
 *   post:
 *     summary: Crea un nuevo registro de log
 *     tags: [Logger]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               level:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Registro de log creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", LoggerController.create);

/**
 * @swagger
 * /logger/{id}:
 *   get:
 *     summary: Obtiene un registro de log por ID
 *     tags: [Logger]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de log
 *     responses:
 *       200:
 *         description: Registro de log encontrado
 *       404:
 *         description: Registro de log no encontrado
 */
router.get("/:id", LoggerController.get);

/**
 * @swagger
 * /logger/{id}:
 *   delete:
 *     summary: Elimina un registro de log
 *     tags: [Logger]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de log
 *     responses:
 *       200:
 *         description: Registro de log eliminado exitosamente
 *       404:
 *         description: Registro de log no encontrado
 */
router.delete("/:id", LoggerController.delete);

module.exports = router;
