// src/redux/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
  },
  reducers: {
    showPopup: (state) => {
      state.show = true;
    },
    hidePopup: (state) => {
      state.show = false;
    },
  },
});

export const { showPopup, hidePopup } = modalSlice.actions;
export default modalSlice.reducer;
