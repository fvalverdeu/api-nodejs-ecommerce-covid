const express = require("express");
const router = express.Router();

const AuthController = require('../controllers/auth');

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.signIn);

module.exports = router;