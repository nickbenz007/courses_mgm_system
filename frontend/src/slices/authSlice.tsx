import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredential: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    updateUserData: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredential, clearCredential, updateUserData } =
  authSlice.actions;
export default authSlice.reducer;
