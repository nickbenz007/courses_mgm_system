import express from "express";
import {
  assignCourseToTeacher,
  getAssignedCourses,
} from "../controller/assignmentsController.js";

const router = express.Router();
router.post("/assign-course", assignCourseToTeacher);
router.get("/teacher/:teacherId", getAssignedCourses);

export default router;
