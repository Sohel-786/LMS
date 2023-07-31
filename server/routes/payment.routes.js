import { Router } from 'express';
import { buySubscription, cancelSubscription, getAllPayments, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller';
import { IsLoggedIn, authorizedRoles } from '../middlewares/auth.middleware';

const router = Router();

router
    .route('/razorpay-key')
    .get(
        IsLoggedIn,
        getRazorpayApiKey
        );

router
    .route('/subscribe')
    .post(
        IsLoggedIn,
        buySubscription
        );

router
    .route('/verify')
    .get(
        IsLoggedIn,
        verifySubscription
        );

router
    .route('/unsubscribe')
    .get(
        IsLoggedIn,
        cancelSubscription
        );

router 
    .route('/')
    .get(
        IsLoggedIn,
        authorizedRoles('ADMIN'),
        getAllPayments
        );


export default router;