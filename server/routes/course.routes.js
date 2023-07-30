import { Router } from 'express';
import { getAllCourses, getLecturesByCourseId } from '../controllers/course.controllers.js';
import IsLoggedIn from '../middlewares/auth.middleware.js';

const router = Router();

router
    .route('/')
    .get(getAllCourses);

router
    .route('/:courseId')
    .get( IsLoggedIn ,getLecturesByCourseId);


export default router;