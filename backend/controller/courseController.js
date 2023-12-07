import expressAsyncHandler from "express-async-handler";
import Course from "../models/Courses.js";

const createCourse = expressAsyncHandler(async (req, res) => {
  const { title, description } = req.body;

  try {
    const existCourse = await Course.findOne({ title });
    if (!title && !description) {
      return res.status(404).json({
        success: false,
        message: "Title and Description are required fields",
      });
    }

    if (existCourse) {
      return res.status(400).json({
        success: false,
        message: "Course already exist.! Please try another course title",
      });
    }

    const createdCourse = await Course.create({
      title: title,
      description: description,
    });

    res.status(201).json({
      success: true,
      message: "Course has been created successfully",
      createdCourse,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
});

const getCourses = expressAsyncHandler(async (req, res) => {
  try {
    const allCourses = await Course.find();
    if (!allCourses) {
      res.status(404).json({
        success: false,
        message: "No course found yet",
      });
    }
    res.status(200).json(allCourses);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getSingleCourse = expressAsyncHandler(async (req, res) => {
  const singleCourseId = req.params._id;
  const singleCourse = await Course.findOne(singleCourseId);

  if (!singleCourse) {
    res.status(404).json({
      success: false,
      message: "Could not found this course",
    });
  }

  if (singleCourse) {
    res.status(200).json({
      success: true,
      singleCourse,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

const updateCourse = expressAsyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;

    const updateCourse = await course.save();

    res.status(200).json(updateCourse);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const deleteCourse = expressAsyncHandler(async (req, res) => {
  const { courseId } = req.params;
  try {
    const findCourseId = await Course.findByIdAndDelete(courseId);
    if (!findCourseId) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
