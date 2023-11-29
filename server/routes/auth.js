const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth');

// http://localhost:8080/resgister
router.post('/register', register);

// http://localhost:8080/login
router.post('/login', login);

module.exports = router;