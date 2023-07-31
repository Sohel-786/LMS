import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/appError.js";


export const getRazorpayApiKey = async (req, res, next) =>{
    try {
            res.status(200).json({
                success : true,
                message : 'Razorpay API Key',
                Key_Id : process.env.RAZORPAY_KEY_ID 
            });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

export const buySubscription = async (req, res, next) =>{
    try {
        
        const { id } = req.user;

        const user = await User.findById(id).lean().exec();

        if(!user){
            return next(new AppError('Unathorized, please login', 500));
        }

        if(user.role == 'ADMIN') {
            return next(new AppError("Admin can't buy a subscription", 400));
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id : process.env.RAZORPAY_PLAN_ID,
            customer_notify : 1
        })

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save();

        return res.status(200).json({
            success : true,
            message : 'Subscribed Successfully'
        })

    } catch (e) {
        return next(new AppError(e.message, 500));
    }

}

export const verifySubscription = async (req, res, next) =>{
    try {
        
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

export const cancelSubscription = async (req, res, next) =>{
    try {
        
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

export const getAllPayments = async (req, res, next) =>{
    try {
        
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}
