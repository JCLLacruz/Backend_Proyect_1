const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/', ProductController.addProduct);
router.put('/update/:id', ProductController.updateProduct);
router.get('/id/:id', ProductController.findProductById);

module.exports = router;