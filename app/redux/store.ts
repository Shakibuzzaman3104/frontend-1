import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movie.slice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
  },
});
