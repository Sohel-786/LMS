import User from "../models/user.model.js";

import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendMail.js";
import crypto from "crypto";
import {
  isEmail,
  isValidPassword,
  isValidPhoneNumber,
} from "../helpers/RegexMatcher.js";

const cookieOptions = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  httpOnly: true,
  sameSite: 'none'
};

//Todo : Wrap It all in Try Catch

const register = async (req, res, next) => {
  const { fullname, email, password, role } = req.body;

  if ((!fullname, !email, !password, !role)) {
    return next(new AppError("All input fields are required", 400));
  }

  if (!isValidPassword(password)) {
    return next(
      new AppError(
        "Password must be 6 to 16 characters long with at least a number and symbol",
        400
      )
    );
  }

  const userExits = await User.findOne({ email });

  if (userExits) {
    return next(new AppError("User Already Registered", 400));
  }

  const user = await User.create({
    fullname,
    email,
    password,
    role : role.toUpperCase(),
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
    sameSite : 'none'
  });

  res.status(200).json({
    success: true,
    msg: "Successfully Logged Out",
  });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if(!user){
      return next(new AppError("Unauthenticated, please login", 400));
    }

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
  // const name = (user.fullname).toUpperCase()
  const message = `
  <div
  style="
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    background-color: #0f1729;
    border-radius: 20px;
  "
>
  <div style="width: 100%; height:250px">
    <img
      style="width: 100%; height: 100%"
      src="https://res.cloudinary.com/da3zef4f0/image/upload/v1696837273/lms/classroomlogo_n9974k.png"
      alt="classroom"
    />
  </div>
  <h1
  style="
    font-size: 30px;
    font-weight: 800;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    text-align: center;
  "
  >
  Hello, ${user.fullname.toUpperCase()}
  </h1>
  <h1
    style="
      font-size: 25px;
      font-weight: 500;
      font-family: Arial, Helvetica, sans-serif;
      color: #d2d2d2da;
      text-align: center;
    "
  >
    Reset Your Password
  </h1>
  <div style="width: fit-content; padding: 10px; margin: auto">
    <a href=${resetPasswordurl}
        style="
          padding: 15px 50px;
          border-radius: 10px;
          background: linear-gradient(
            to right,
            rgb(56, 0, 146),
            rgb(0, 119, 198)
          );
          color: white;
          font-weight: bold;
          font-size: 23px;
          border: 1px solid white;
          cursor: pointer;
          letter-spacing: 3px;
          font-family: 'Roboto Condensed', sans-serif;
          text-decoration : none
        "
      >
        Reset
    </a>
  </div>

  <div style="width: 80px; height: 80px; margin: auto">
    <img
      style="width: 100%; height: 100%"
      src="https://res.cloudinary.com/da3zef4f0/image/upload/v1696838585/lms/giphy_lrbsuy.gif"
      alt="arrowGif"
    />
  </div>

    <div style="width:95%;margin:auto;background-color:white;border-radius:10px">
      <p style="color: black; text-align: center;font-size: 14px;font-family:Verdana, Geneva, Tahoma, sans-serif;font-weight: 700;letter-spacing: 1.5px;padding:20px 15px">
      If the above link doesn't work for some reason then copy paste this
      link in new tab
    </p>
       <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;text-decoration: underline;font-size: 13px;text-align: center;padding-bottom:15px">${resetPasswordurl}</p>
    </div>
   

    <div style="width: 80%; border-left:5px solid rgb(255, 0, 255);margin:20px 80px; padding:5px 30px;border-radius: 10px;">
      <p style="font-size: 18px; color: rgb(255, 143, 143);font-weight:bold;font-family:monospace;letter-spacing: 1.5px;">If you have not requested this, kindly ignore it.</p>
    </div>
</div>`;

  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password mail has been sent to registered email successfully!`,
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

  if (!isValidPassword(password)) {
    return next(
      new AppError(
        "Password must be 6 to 16 characters long with at least a number and symbol",
        400
      )
    );
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

  if (!isValidPassword(newPassword)) {
    return next(
      new AppError(
        "Password must be 6 to 16 characters long with at least a number and symbol",
        400
      )
    );
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

async function contactUs(req, res, next) {
  const { firstname, lastname, email, phNo, message, term } = req.body;

  if (!firstname || !lastname || !email || !phNo || !message || !term) {
    return next(new AppError("All fields required", 400));
  }

  if (!isEmail(email)) {
    return next(new AppError("Invalid Email, Please provide valid email", 400));
  }

  if (!isValidPhoneNumber(phNo)) {
    return next(new AppError("Invalid Phone Number, Please recheck", 400));
  }

  const subject = `Greeting to you ${
    firstname + " " + lastname
  } from Classroom`;
  const msg = `<div style="width:100%;height:100%;padding-bottom:50px;background-color:#0f1729;border-radius: 20px;">
  <div style="width:100%;height:250px;"><img style="width:100%;height:100%;" src='https://res.cloudinary.com/da3zef4f0/image/upload/v1696837273/lms/classroomlogo_n9974k.png' alt='classroom' /></div>
  <h1 style="font-size:45px;font-weight:900;font-family: Arial, Helvetica, sans-serif;color: white;text-align:center;">Thank You
  <span style="font-size: 15px;text-align:center;font-weight: bolder;font-family: Arial, Helvetica, sans-serif;color: skyblue;letter-spacing: 1px;display:block">for reaching out to us</span>
  <span style="font-size: 20px;font-weight:900;font-family: Arial, Helvetica, sans-serif;color: rgb(255, 0, 166);letter-spacing: 1px;text-align:center;display:block">we will connect to you soon</span></h1>
  <div style="width:80%;background-color: white;border-radius: 10px;padding: 20px;margin: auto;">
    <p style="font-size: 20px;font-weight:bolder;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Your Message</p>
    <div style="padding: 15px 20px;border-left: 5px solid rgb(0, 199, 0);border-radius: 10px;margin-left:20px;"><p style="font-weight: 600;font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">${message}</p></div>
  </div>
    </div>
`;

  try {
    await sendEmail(email, subject, msg);

    res.status(200).json({
      success: true,
      message: "Thank you, We will reach you soon",
    });
  } catch (e) {
    return next(new AppError("Something went wrong, please try again", 500));
  }
}

export {
  register,
  login,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  contactUs,
};
