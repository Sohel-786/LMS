import { Router } from 'express';

const router = Router();

router
    .route('/')
    .get(getAllCourses);


export default router;