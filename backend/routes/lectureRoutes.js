import express from "express";
import { uploadLecture } from "../controller/lectureController.js";
import upload from "../middleware/uploadLectureMiddlware.js";

const router = express.Router();
router.post("/upload-lecture", upload.single("file"), uploadLecture);

export default router;
