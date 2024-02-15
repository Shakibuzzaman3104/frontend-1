import { Movie } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovie: (state: any, action: PayloadAction<Movie>) => {
      state.push(action.payload);
    },
    editMovie: (state, action) => {
      const { id, name, review } = action.payload;
      const movieIndex = state.findIndex((movie: Movie) => movie.id === id);
      if (movieIndex !== -1) {
        state[movieIndex].name = name;
        state[movieIndex].review = review;
      }
    },
    setMovies: (state, action) => {
      return action.payload;
    },
    moveMovie: (state, action) => {
      const { id, columnId } = action.payload;
      const movieIndex = state.findIndex((movie: Movie) => movie.id === id);
      if (movieIndex !== -1) {
        state[movieIndex].columnId = columnId;
      }
    },
  },
});

export const { addMovie, setMovies, editMovie, moveMovie } = movieSlice.actions;
export default movieSlice.reducer;
