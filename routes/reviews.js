const express = require('express');
const ReviewController = require('../controllers/ReviewController.js');
const router = express.Router();
const {authentication, isAdmin} = require('../middleware/authentication.js')

router.get('/', ReviewController.getAll);
router.post('/', authentication, ReviewController.addReview);
router.put('/id/:id', authentication, ReviewController.updateReview);
router.delete('/id/:id', authentication, ReviewController.deleteReview);

module.exports = router;