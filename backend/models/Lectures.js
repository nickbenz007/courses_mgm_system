import * as mongoose from "mongoose";

const lecturesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  },
);

const Lectures = mongoose.model("Lectures", lecturesSchema);
export default Lectures;
