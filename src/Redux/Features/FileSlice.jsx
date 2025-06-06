import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "files",
  initialState: [],
  reducers: {
    addFile: (state, action) => {
      state.push(action.payload);
    },
    removeFile: (state, action) => {
      return state.filter((file) => file.name !== action.payload);
    },
  },
});

export const { addFile, removeFile } = fileSlice.actions;
export default fileSlice.reducer;
