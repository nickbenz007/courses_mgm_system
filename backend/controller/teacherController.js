import expressAsyncHandler from "express-async-handler";
import Courses from "../models/Courses.js";
import User from "../models/User.js";
import courses from "../models/Courses.js";

const getTeachers = expressAsyncHandler(async (req, res) => {
  try {
    const teachers = await User.find({ role: "Teacher" });
    // const teachers = await User.find({ role: "Teacher" }).populate({
    //   path: "courses",
    //   model: "Courses", // The name of the Course model
    // });

    if (!teachers) {
      res.status(404).json({
        success: false,
        message: "Teachers data not found",
      });
    }
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});
const getSingleTeacher = expressAsyncHandler(async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "Teacher") {
      res.status(404).json({
        message: "Teacher not found!",
      });
    }
    const coursesIds = teacher.courses;
    const courses = await Courses.find({ _id: { $in: teacher.courses } });
    teacher.courses = courses;

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error: error,
    });
  }
});

export { getTeachers, getSingleTeacher };
