import JWT from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const IsLoggedIn = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    return next(new AppError("Unauthenticated, please login", 401));
  }

  const tokenDetails = JWT.verify(token, process.env.JWT_SECRET);

  if (!tokenDetails) {
    return next(new AppError("Unauthenticated, please login", 401));
  }

  req.user = tokenDetails;

  next();
};

export const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const currentRole = req.user.role;

    if (!roles.includes(currentRole)) {
      return next(
        new AppError("You do not have permission to access this route", 400)
      );
    }

    next();
  };

export const authorizedSubscriber = async (req, res, next) => {
  const subscriptionStatus = req.user.subscription.status;
  const currentRole = req.user.role;
  if (currentRole !== "ADMIN" && subscriptionStatus !== "active") {
    return next(new AppError("Please subscribe to access the course", 403));
  }
  next();
};
