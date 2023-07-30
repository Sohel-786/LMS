import Course from "../models/course.model.js";
import AppError from "../utils/appError.js";


export const getAllCourses = async (req , res, next) =>{
    try {

        const courses = await Course.find().select('-lectures').lean().exec();
        res.status(200).json({
            success : true,
            message : 'All Courses',
            courses
        })

    } catch (e) {
        return next( new AppError (e.message, 500));
    }
}

export const getLecturesByCourseId = async (req, res, next) =>{
    try {
        
        const { courseId } = req.params;
        const course = await Course.findById({_id:courseId}).lean().exec();

        if(!course){
            return next(new AppError('Invalid course Id', 400))
        }

        res.status(200).json({
            success : true,
            message : 'All Lectures fetched Successfully',
            lectures : course.lectures
        })


    } catch (e) {
        return next( new AppError(e.message, 500));
    }
}