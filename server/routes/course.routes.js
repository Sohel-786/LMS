import { Router } from 'express';
import { createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from '../controllers/course.controllers.js';
import IsLoggedIn from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middlerware.js';

const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post( 
           upload.single('thumbnail')
           ,createCourse
           );

router
    .route('/:courseId')
    .get( IsLoggedIn ,getLecturesByCourseId)
    .put(updateCourse)
    .delete(deleteCourse);


export default router;