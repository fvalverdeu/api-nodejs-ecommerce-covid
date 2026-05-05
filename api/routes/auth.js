const express = require("express");
const router = express.Router();

const AuthController = require('../controllers/auth');

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/sign-up", AuthController.signUp);

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Inicio de sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/sign-in", AuthController.signIn);

module.exports = router;