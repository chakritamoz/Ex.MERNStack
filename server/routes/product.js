const express = require('express');
const router = express.Router();
const product = require('../controllers/product');

// Middleware
const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// http://localhost:8080/product
router.get('/product', product.list);

// http://localhost:8080/product/5
router.get('/product/:id', product.read);

// http://localhost:8080/product
router.post('/product', upload, product.create);

// http://localhost:8080/product/5
router.put('/product/:id', product.update);

// http://localhost:8080/product
router.delete('/product/:id', product.remove);

module.exports = router;