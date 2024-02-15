import { Column, Movie } from "@/types";

export const defaultColumns: Column[] = [
  {
    id: "watchlist",
    title: "Watch List",
  },
  {
    id: "watching",
    title: "Watching",
  },
  {
    id: "watched",
    title: "Watched",
  },
];

export const defaultMovies: Movie[] = [
  {
    id: 1,
    columnId: "watchlist",
    name: "Titanic",
    review: "This is dummy review 1",
  },
  {
    id: 2,
    columnId: "watching",
    name: "Iron Man",
    review: "This is dummy review 2",
  },
  {
    id: 3,
    columnId: "watchlist",
    name: "Superman",
    review: "This is dummy review 3",
  },
  {
    id: 4,
    columnId: "watched",
    name: "Avatar",
    review: "This is dummy review 4",
  },
];
