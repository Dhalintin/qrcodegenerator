const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const userValidation = require('../middlewares/user.middlewares')

// Store User data
router.post('/save', userValidation, controller.save);

// Retrieve all users data
router.get('/', controller.getusers);

// Retrieve a specific user's data
router.get('/:id', controller.getuser)


module.exports = router;
