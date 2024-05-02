const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.get('/', CategoryController.getAll);
router.post('/', CategoryController.addCategory);
router.put('/update/:id', CategoryController.updateCategory);
router.delete('/id/:id', CategoryController.deleteCategoryById);

module.exports = router;