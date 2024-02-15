import { addMovie } from "@/app/redux/slices/movie.slice";

export async function fetchMovies(dispatch: any) {
  const response = await fetch("/api");
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  dispatch(addMovie(data));
  return data;
}
