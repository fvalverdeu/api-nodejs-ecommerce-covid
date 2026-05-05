const express = require("express");
const router = express.Router();

const TemperatureController = require('../controllers/temperature');

/**
 * @swagger
 * /temperature:
 *   get:
 *     summary: Obtiene todos los registros de temperatura
 *     tags: [Temperatura]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de temperatura
 */
router.get("/", TemperatureController.getAll);

/**
 * @swagger
 * /temperature:
 *   post:
 *     summary: Crea un nuevo registro de temperatura
 *     tags: [Temperatura]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               unit:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Registro de temperatura creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", TemperatureController.create);

/**
 * @swagger
 * /temperature/{id}:
 *   get:
 *     summary: Obtiene un registro de temperatura por ID
 *     tags: [Temperatura]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de temperatura
 *     responses:
 *       200:
 *         description: Registro de temperatura encontrado
 *       404:
 *         description: Registro de temperatura no encontrado
 */
router.get("/:id", TemperatureController.get);

/**
 * @swagger
 * /temperature/filter:
 *   post:
 *     summary: Filtra registros de temperatura por fecha
 *     tags: [Temperatura]
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
router.post("/filter", TemperatureController.getFilterByDate);

module.exports = router;
