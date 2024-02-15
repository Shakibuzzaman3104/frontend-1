import { Movie } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Movie[] = [];

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.push(action.payload);
      localStorage.setItem("movies", JSON.stringify(state));
    },
    editMovie: (state, action: PayloadAction<Movie>) => {
      const { id, name, review } = action.payload;
      const movieIndex = state.findIndex((movie) => movie.id === id);
      if (movieIndex !== -1) {
        state[movieIndex].name = name;
        state[movieIndex].review = review;
        localStorage.setItem("movies", JSON.stringify(state));
      }
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      return action.payload;
    },
    moveMovie: (state, action) => {
      const { id, columnId } = action.payload;
      const movieIndex = state.findIndex((movie) => movie.id === id);
      if (movieIndex !== -1) {
        state[movieIndex].columnId = columnId;
        localStorage.setItem("movies", JSON.stringify(state));
      }
    },
  },
});

export const { addMovie, setMovies, editMovie, moveMovie } = movieSlice.actions;
export default movieSlice.reducer;
