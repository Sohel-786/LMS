import { Router } from "express";
import {
  addLectureToCourse,
  createCourse,
  deleteCourse,
  deleteLectureById,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
} from "../controllers/course.controllers.js";
import {
  IsLoggedIn,
  authorizedRoles,
  authorizedSubscriber,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middlerware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    IsLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );

router
  .route("/:courseId")
  .get(IsLoggedIn, authorizedSubscriber, getLecturesByCourseId)
  .put(
    IsLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    updateCourse
  )
  .delete(IsLoggedIn, authorizedRoles("ADMIN"), deleteCourse)
  .post(
    IsLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("lecture"),
    addLectureToCourse
  );

router.post(
  "/deleteLecture/:courseId/:lectureId",
  IsLoggedIn,
  authorizedRoles("ADMIN"),
  deleteLectureById
);

export default router;
