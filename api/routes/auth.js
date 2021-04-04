const express = require('express');
const router = express.Router();

const { AuthController } = require('../controllers');

router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);

module.exports = router;