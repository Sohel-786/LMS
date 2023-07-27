const express = require('express');
const router = express.Router();

const { register, login, logout, getUser} = require('../controllers/user.controllers');

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/me', getUser);


module.exports = router;