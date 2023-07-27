const express = require('express');
const router = express.Router();

const { register, login, logout, getUser} = require('../controllers/user.controllers');

const {IsLoggedIn} = require('../middlewares/auth.middleware');

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/me', IsLoggedIn, getUser);


module.exports = router;