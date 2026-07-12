import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";

/**
 * Redux Store Configuration
 * Menggunakan Redux Toolkit untuk state management
 */
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;
