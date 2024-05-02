const express = require('express');
const UserController = require('../controllers/UserController.js');
const router = express.Router();
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/getoneonline/:id', authentication, UserController.getOneOnline);
router.post('/signup', UserController.singUp);
router.post('/signin', UserController.singIn);
router.put('/:id',authentication, isAdmin, UserController.updateById);
router.delete('/:id', authentication, isAdmin, UserController.deleteById);
router.delete('/logout', authentication, isAdmin, UserController.logout);


module.exports = router;