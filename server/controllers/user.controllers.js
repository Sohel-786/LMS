import User from "../models/user.model.js";

import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendMail.js";
import crypto from "crypto";

const cookieOptions = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  httpOnly: true,
};

//Todo : Wrap It all in Try Catch

const register = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if ((!fullname, !email, !password)) {
    return next(new AppError("All input fields are required", 400));
  }

  const userExits = await User.findOne({ email });

  if (userExits) {
    return next(new AppError("User Already Registered", 400));
  }

  const user = await User.create({
    fullname,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: "secure_url",
    },
  });

  if (!user) {
    return next(
      new AppError("User Registeration failed, please try again later", 400)
    );
  }

  // TODO : upload user picture

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError("File not uploaded, please try again", 500));
    }
  }

  await user.save();

  // TODO : jwttoken

  user.password = undefined; // so the password don't get returned in res

  res.status(201).json({
    success: true,
    user,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if ((!email, !password)) {
    return next(new AppError("All input fields are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Email or Password do not match", 400));
  }

  const token = await user.JWTtoken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    msg: "User Logged In Successfully",
    user,
  });
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    msg: "Successfully Logged Out",
  });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Email is not registered", 400));
  }

  const resetToken = await user.generatePasswordToken();

  await user.save();

  const resetPasswordurl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = "Reset Password";
  const message = `You can reset your password by clicking <a href = ${resetPasswordurl} target = "_blank"> Reset your password  </a>\n if the above link doesn't work for some reason then copy paste this link in new tab ${resetPasswordurl}.\n If you have not requested this, kindly ignore it.`;

  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password mail has been sent to ${email} successfully!`,
    });
  } catch (e) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();

    return next(new AppError(e.message, 500));
  }
};

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!password) {
    return next(new AppError("Password is Required", 400));
  }

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Token in invalid or expired, please try again", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

const changePassword = async function (req, res, next) {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are required", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  const isPasswordvalid = await user.comparePassword(oldPassword);

  if (!isPasswordvalid) {
    return next(new AppError("Invalid Old Password", 400));
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Your Password is changed",
    user,
  });
};

const updateProfile = async (req, res, next) => {
  const { fullname } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  if (fullname) {
    user.fullname = fullname;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "lms",
      width: 250,
      height: 250,
      gravity: "faces",
      crop: "fill",
    });

    if (result) {
      user.avatar.public_id = result.public_id;
      user.avatar.secure_url = result.secure_url;

      // remove file from local server
      fs.rm(`uploads/${req.file.filename}`);
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User details updated successfully",
  });
};

export {
  register,
  login,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
};
