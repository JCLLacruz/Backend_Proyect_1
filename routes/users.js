const express = require('express');
const UserController = require('../controllers/UserController.js');
const router = express.Router();
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/singup', authentication, isAdmin, UserController.getAll);
router.post('/singup', UserController.singUp);
router.post('/singin', UserController.singIn);
router.put('/:id',authentication, isAdmin, UserController.updateById);
router.delete('/singup', authentication, isAdmin, UserController.deleteById);
router.delete('/logout', authentication, isAdmin, UserController.logout);


module.exports = router;