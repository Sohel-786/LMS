import express from 'express';
const userRoutes = express.Router();

import { register, login, logout, getUser, resetPassword, forgotPassword} from '../controllers/user.controllers.js';

import IsLoggedIn from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middlerware.js';

userRoutes.post('/register', upload.single('avatar') ,register);

userRoutes.post('/login', login);

userRoutes.get('/logout', logout);

userRoutes.get('/me', IsLoggedIn, getUser);

userRoutes.post('/reset', forgotPassword);

userRoutes.post('/reset/:token', resetPassword);

export default userRoutes;