import express from "express";
const userRoutes = express.Router();

import {
  register,
  login,
  logout,
  getUser,
  resetPassword,
  forgotPassword,
  changePassword,
  updateProfile,
  contactUs,
} from "../controllers/user.controllers.js";

import { IsLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middlerware.js";

userRoutes.post("/register", upload.single("avatar"), register);

userRoutes.post("/login", login);

userRoutes.get("/logout", IsLoggedIn, logout);

userRoutes.get("/me", IsLoggedIn, getUser);

userRoutes.post("/reset", forgotPassword);

userRoutes.post("/reset/:resetToken", resetPassword);

userRoutes.post("/changepassword", IsLoggedIn, changePassword);

userRoutes.post("/update", IsLoggedIn, upload.single("avatar"), updateProfile);

userRoutes.post("/contactUs", contactUs);

export default userRoutes;
