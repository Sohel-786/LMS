import Course from "../models/course.model.js";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import Duration from "../helpers/VideoDuration.js";

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

    if (!title || !description || !category || !createdBy) {
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
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Course Doesn't exists", 400));
    }

    course.title = title,
    course.description = description,
    course.category = category,
    course.createdBy = createdBy;

    if (req.file) {
      await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
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

    const course = await Course.findById(courseId);
    if(!course){
      return next(new AppError("Course Doesn't Exists"));
    }

    await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);

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
        resource_type: "video",
        folder: "lms",
        chunk_size: 7000000,
      });

      console.log(result);
      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
        console.log(Duration(result.duration));
        lectureData.lecture.duration = Duration(result.duration);
      }

      fs.rm(`uploads/${req.file.filename}`);

      console.log(lectureData);
      course.lectures.push(lectureData);
      course.numberofLectures = course.lectures.length;

      await course.save();

      res.status(200).json({
        success: true,
        message: "Lecture got added successfully",
        course,
      });
    }
  } catch (e) {
    // console.log(e);
    return next(new AppError(e.message, 500));
  }
};

export const deleteLectureById = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Course Doesn't exists", 400));
    }
    var public_id ;

    const lectures = course.lectures.filter((el) => {
      if (el._id.toString() !== lectureId) {
        return el;
      }else{
        public_id = el.lecture.public_id
      }
    });

    if(public_id){
      await cloudinary.v2.uploader.destroy(public_id);
    }
    course.lectures = lectures;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture got deleted successfully",
      lectures: course.lectures,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
