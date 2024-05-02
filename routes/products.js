const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.get('/id/:id', ProductController.getProductById);
router.get('/name/:name', ProductController.getProductByName);
router.get('/price/:price', ProductController.getProductsByPrice);
router.get('/descprice', ProductController.productsDescByPrice);
router.post('/', ProductController.addProduct);
router.put('/update/:id', ProductController.updateProduct);
router.delete('/id/:id', ProductController.deleteProductById);

module.exports = router;