const express = require('express');
const ProductController = require('../controllers/ProductController.js');
const router = express.Router();
const {authentication, isAdmin} = require('../middleware/authentication.js')

router.get('/', ProductController.getAll);
router.get('/id/:id', ProductController.getProductById);
router.get('/name/:name', ProductController.getProductByName);
router.get('/price/:price', ProductController.getProductsByPrice);
router.get('/descprice', ProductController.productsDescByPrice);
router.get('/ascprice', ProductController.productsAscByPrice);
router.post('/', authentication, isAdmin, ProductController.addProduct);
router.put('/:id', authentication, isAdmin, ProductController.updateProduct);
router.delete('/id/:id', authentication, isAdmin, ProductController.deleteProductById);

module.exports = router;