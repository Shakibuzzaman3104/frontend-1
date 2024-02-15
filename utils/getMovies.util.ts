import { setMovies } from "@/app/redux/slices/movie.slice";

export const fetchMovies = (): any => async (dispatch: any) => {
  try {
    const response = await fetch("api");
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    dispatch(setMovies(data));
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
