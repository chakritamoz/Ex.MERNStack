const express = require('express');
const router = express.Router();
const product = require('../controllers/product');

// Middleware
const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// http://localhost:8080/product
router.get('/product', auth, product.list);

// http://localhost:8080/product/5
router.get('/product/:id', auth, product.read);

// http://localhost:8080/product
router.post('/product', auth, upload, product.create);

// http://localhost:8080/product/5
router.put('/product/:id', auth, product.update);

// http://localhost:8080/product
router.delete('/product/:id', auth, product.remove);

module.exports = router;