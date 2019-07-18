const express = require('express');
const authController = require('./controllers/auth.controller')

const router = express.Router();

router.post('/singin', authController.singin);

module.exports = router;
