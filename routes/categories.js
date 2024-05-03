const express = require('express');
const CategoryController = require('../controllers/CategoryController.js');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication.js');

router.get('/', CategoryController.getAll);
router.get('/id/:id', CategoryController.getOneById);
router.get('/name/:category', CategoryController.getByName);
router.post('/',authentication, isAdmin, CategoryController.addCategory);
router.put('/update/:id', authentication, isAdmin, CategoryController.updateCategory);
router.delete('/id/:id', authentication, isAdmin, CategoryController.deleteCategoryById);

module.exports = router;
