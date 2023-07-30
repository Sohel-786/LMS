import { Router } from 'express';
import { createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from '../controllers/course.controllers.js';
import IsLoggedIn from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middlerware.js';

const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post( 
           IsLoggedIn,
           authorizedRoles('ADMIN'),
           upload.single('thumbnail')
           ,createCourse
           );

router
    .route('/:courseId')
    .get( IsLoggedIn ,getLecturesByCourseId)
    .put(
        IsLoggedIn,
        authorizedRoles('ADMIN'),
        updateCourse)
    .delete(
        IsLoggedIn,
        authorizedRoles('ADMIN'),
        deleteCourse);


export default router;