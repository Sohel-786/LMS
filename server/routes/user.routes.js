import express from 'express';
const userRoutes = express.Router();

import { register, login, logout, getUser} from '../controllers/user.controllers.js';

import IsLoggedIn from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middlerware.js';

userRoutes.post('/register', upload.single('avatar') ,register);

userRoutes.post('/login', login);

userRoutes.get('/logout', logout);

userRoutes.get('/me', IsLoggedIn, getUser);

export default userRoutes;