import * as mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model("Course", coursesSchema);
export default Course;
