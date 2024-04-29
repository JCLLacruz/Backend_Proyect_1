const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.put('/products',ProductController.addProduct);