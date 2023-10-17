import { Router } from "express";
import { IsLoggedIn, authorizedRoles } from "../middlewares/auth.middleware";
import { userStats } from "../controllers/miscellaneous.controller";
const router = Router();

router
    .route('/admin/stats/users')
    .get(IsLoggedIn, authorizedRoles('ADMIN'), userStats);

export default router;