import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/appError.js";
import crypto from "crypto";

const cookieOptions = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  httpOnly: true,
  sameSite: 'none'
};

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API Key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unathorized, please login", 500));
    }

    if (user.role == "ADMIN") {
      return next(new AppError("Admin can't buy a subscription", 400));
    }

    if(user.subscription.status === 'active'){
      return next(new AppError('Already a Subscriber'));
    }

    if(user.subscription.status === 'created' && user.subscription.id){
      return res.status(200).json({
        success: true,
        message: "Subscribed Successfully",
        subscription_id: user.subscription.id,
      });
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      total_count: 1,
      customer_notify : 1
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
      subscription_id: subscription.id,
    });
  } catch (e) {
    return next(new AppError(e, 500));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unathorized, please login", 500));
    }

    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`);

    if (generatedSignature == razorpay_signature) {
      return next(new AppError("Payment not verified, please try again", 500));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";

    const token = await user.JWTtoken();
    res.cookie("token", token, cookieOptions);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unathorized, please login", 500));
    }

    if (user.role == "ADMIN") {
      return next(new AppError("Admin can't cancel the subscription", 400));
    }

    const subscription_id = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(
      "sub_MmvHUCaAAP85Im"
    );

    user.subscription.status = subscription.status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Subscription Cancelled",
    });
  } catch (e) {
    return next(new AppError(e?.error?.description, 500));
  }
};

export const getAllPayments = async (req, res, next) => {
  try{
    const { count, skip } = req.query;

    // Find all subscriptions from razorpay
    const allPayments = await razorpay.subscriptions.all({
      plan_id : process.env.RAZORPAY_PLAN_ID,
      count: count ? count : 10, // If count is sent then use that else default to 10
      skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.start_at * 1000);
      return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  }catch (e) {
    return next(new AppError(e.message, 500));
  }
};
