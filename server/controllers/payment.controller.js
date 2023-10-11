import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/appError.js";

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
    console.log(user)

    if (!user) {
      return next(new AppError("Unathorized, please login", 500));
    }

    if (user.role == "ADMIN") {
      return next(new AppError("Admin can't buy a subscription", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count : 2
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

    const user = await User.findById(id).lean().exec();

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

    const user = await User.findById(id).lean().exec();

    if (!user) {
      return next(new AppError("Unathorized, please login", 500));
    }

    if (user.role == "ADMIN") {
      return next(new AppError("Admin can't cancel the subscription", 400));
    }

    const subscription_id = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscription_id);

    user.subscription.status = subscription.status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Subscription Cancelled",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subscriptions = await razorpay.subscriptions.all({
      count: count || 10,
    });

    return res.status(200).json({
      success: true,
      message: "All Payments",
      payments: subscriptions,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
