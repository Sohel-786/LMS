import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

export const userStats = async (req, res, next) => {
  try {
    const allUsersCount = await User.countDocuments();

    const subscribedUsers = await User.countDocuments({
      "subscription.status": "active",
    });

    res.status(200).json({
      success: true,
      message: "All registered user count",
      allUsersCount,
      subscribedUsers,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
