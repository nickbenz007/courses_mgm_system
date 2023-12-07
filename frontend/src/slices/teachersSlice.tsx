import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  teachers: localStorage.getItem("teachers")
    ? JSON.parse(localStorage.getItem("teachers")!)
    : {},
};

const teachersSlice: any = createSlice({
  name: "teachers",
  initialState: initialState,
  reducers: {
    setTeachersData: (state, action) => {
      state.teachers = action.payload;
      localStorage.setItem("teachers", JSON.stringify(action.payload));
    },
  },
});

export const { setTeachersData }: any = teachersSlice.actions;
export default teachersSlice.reducer;
