const express = require("express");
const router = express.Router();

const CalibrationController = require('../../controllers/calibration');

/**
 * @swagger
 * /calibration:
 *   get:
 *     summary: Obtiene todos los registros de calibración
 *     tags: [Calibración]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de calibración
 */
router.get("/", CalibrationController.getAll);

/**
 * @swagger
 * /calibration:
 *   post:
 *     summary: Crea un nuevo registro de calibración
 *     tags: [Calibración]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device:
 *                 type: string
 *               calibrationDate:
 *                 type: string
 *                 format: date
 *               values:
 *                 type: object
 *     responses:
 *       201:
 *         description: Registro de calibración creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", CalibrationController.create);

/**
 * @swagger
 * /calibration/{id}:
 *   get:
 *     summary: Obtiene un registro de calibración por ID
 *     tags: [Calibración]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de calibración
 *     responses:
 *       200:
 *         description: Registro de calibración encontrado
 *       404:
 *         description: Registro de calibración no encontrado
 */
router.get("/:id", CalibrationController.get);

/**
 * @swagger
 * /calibration/filter:
 *   post:
 *     summary: Filtra registros de calibración por fecha
 *     tags: [Calibración]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Registros filtrados encontrados
 */
router.post("/filter", CalibrationController.getFilterByDate);

module.exports = router;
