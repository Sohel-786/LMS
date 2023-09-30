import Course from "../models/course.model.js";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures").lean().exec();
    res.status(200).json({
      success: true,
      message: "Fetched all courses successfully",
      courses,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).lean().exec();

    if (!course) {
      return next(new AppError("Invalid course Id", 400));
    }

    res.status(200).json({
      success: true,
      message: "All Lectures fetched Successfully",
      lectures: course.lectures,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;
    console.log(req.body);

    if ((!title || !description || !category || !createdBy)) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "dummy",
        secure_url: "dummy",
      },
    });

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });

      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course got created successfully",
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Course Doesn't exists", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const addLectureToCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { courseId } = req.params;

    if (!title || !description) {
      return next("All fields are required", 400);
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next("Course with given id doesn't exist!", 400);
    }

    const lectureData = {
      title,
      description,
      lecture: {},
    };

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });

      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);

      course.lectures.push(lectureData);
      course.numberofLectures = course.lectures.length;

      await course.save();

      res.status(200).json({
        success: true,
        message: "Lecture got added successfully",
        coruse,
      });
    }
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
