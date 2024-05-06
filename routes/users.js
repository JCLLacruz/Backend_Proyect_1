const express = require('express');
const UserController = require('../controllers/UserController.js');
const router = express.Router();
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/getoneonline/:id', authentication, UserController.getOneOnline);
router.get('/confirm/:emailToken', UserController.confirmUser);
router.post('/signup', UserController.singUp);
router.post('/signin', UserController.singIn);
router.put('/:id',authentication, UserController.updateById);
router.delete('/id/:id', authentication, isAdmin, UserController.deleteById);
router.delete('/logout', authentication, UserController.logout);


module.exports = router;