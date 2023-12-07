import expressAsyncHandler from "express-async-handler";
import Lectures from "../models/Lectures.js";
import mongoose from "mongoose";

const uploadLecture = expressAsyncHandler(async (req, res) => {
  const { title, courseId, file } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const lecture = new Lectures({
      title,
      file: req.file.path,
      course: courseId,
    });

    const savedLecture = await lecture.save();

    res.status(201).json({
      success: true,
      message: "Lecture uploaded successfully",
      uploadedLecture: savedLecture,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: err.message,
    });
  }
});

export { uploadLecture };
