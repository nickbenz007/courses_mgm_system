import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Course from "../models/Courses.js";
import mongoose from "mongoose";
const assignCourseToTeacher = expressAsyncHandler(async (req, res) => {
  const { teacherId, courseId } = req.body;
  try {
    const course = await Course.findById(courseId);
    const teacher = await User.findById(teacherId);
    if (!mongoose.Types.ObjectId.isValid(courseId) || !teacherId) {
      return res.status(404).json({
        success: false,
        message: "Course Id is not available",
      });
    }

    if (!course || !teacher || teacher.role !== "Teacher") {
      return res.status(404).json({
        success: false,
        message: "Teacher or Course not found",
      });
    }
    if (teacher.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "The course is already assigned to the Teacher.",
      });
    }
    teacher.courses.push(courseId);
    await teacher.save();
    const assignedCourse = await User.findById(teacherId).populate("courses");

    res.status(201).json({
      success: true,
      message: "Course has been assigned to the Teacher successfully",
      assignedCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: err.message,
    });
  }
});

const getAssignedCourses = expressAsyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacherWithCourses = await User.findById(teacherId).populate(
      "courses",
      "id title description",
    );

    if (!teacherWithCourses || teacherWithCourses.role !== "Teacher") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const assignedCourses = teacherWithCourses.courses;

    res.status(200).json({
      success: true,
      message: "Found teachers with courses",
      assignedCourses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  }
});

export { getAssignedCourses, assignCourseToTeacher };
