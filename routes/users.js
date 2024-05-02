const express = require('express');
const UserController = require('../controllers/UserController.js');
const router = express.Router();

router.post('/', UserController.singUp);
router.post('/singIn/', UserController.singIn);


module.exports = router;