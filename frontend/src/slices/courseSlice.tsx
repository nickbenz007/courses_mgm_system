import { createSlice } from "@reduxjs/toolkit";

const coursesSlice: any = createSlice({
  name: "course",
  initialState: {
    courseInfo: localStorage.getItem("courses")
      ? JSON.parse(localStorage.getItem("courses"))
      : {},
  },
  reducers: {
    setCoursesData: (state, action) => {
      state.courseInfo = action.payload;
      localStorage.setItem("courses", JSON.stringify(action.payload));
    },
    updateCoursesData: (state, action) => {
      state.courseInfo = action.payload;
      localStorage.setItem("courses", JSON.stringify(action.payload));
    },
    assignCourseToTeacher: (state, action) => {
      const { teacherId, courseId } = action.payload;
      const updatedCourses = state.courseInfo.map((course: any) => {
        if (course._id === courseId) {
          return {
            ...course,
            assignedCourse: { teacherId, courseId },
          };
        }
        return course;
      });

      state.courseInfo = updatedCourses;
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    },
  },
});

export const { setCoursesData, updateCoursesData, assignCourseToTeacher } =
  coursesSlice.actions;
export default coursesSlice.reducer;
