const express = require('express');
const OrderController = require('../controllers/OrderController.js');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication.js');

router.get('/',OrderController.getAll);
router.post('/',OrderController.addOrder);

module.exports = router;