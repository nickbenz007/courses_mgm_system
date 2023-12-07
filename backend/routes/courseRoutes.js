import express from "express";
import {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";

const router = express.Router();
router.post("/create-course", createCourse);
router.get("/get-courses", getCourses);
router.get("/get-course/:id", getSingleCourse);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);
export default router;
