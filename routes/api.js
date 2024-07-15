const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const userValidation = require('../middlewares/user.middlewares');
const imageValidator = require('../middlewares/image.middleware');
const loginValidation = require('../middlewares/login.middleware');
const signupValidation = require('../middlewares/signup.middleware');
const multer = require('multer');
const path = require('path');

const upload = multer({ 
    dest: 'uploads/'
});

// Store User data
router.post('/save', userValidation, controller.save);

// Store User data
router.post('/upload/:id', upload.single('image'), imageValidator, controller.uploadimage);

// Retrieve all users data
router.get('/', controller.getusers);

// Retrieve a specific user's data
router.get('/:id', controller.getuser);

// Retrieve a specific user's details
router.get('/detail/:id', controller.getuser);

// Login route
router.post('/signup', signupValidation, controller.signup);

// Sign up route
router.post('/login', loginValidation, controller.login);


module.exports = router;
