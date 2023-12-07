import express from "express";
import {
  getSingleTeacher,
  getTeachers,
} from "../controller/teacherController.js";

const router = express.Router();

router.get("/get-all-teachers", getTeachers);
router.get("/get-teacher/:teacherId", getSingleTeacher);

export default router;
