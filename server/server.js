import app from "./app.js";

import connect from "./config/db.js";

import cloudinary from "cloudinary";

import Razorpay from "razorpay";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const PORT = process.env.PORT || 6020;

app.listen(PORT, () => {
  connect();
  console.log(`Listening on ${PORT}`);
});
