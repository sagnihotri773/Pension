import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './Redux/Features/FileSlice';

export const store = configureStore({
  reducer: {
    files: fileReducer,
  },
});
