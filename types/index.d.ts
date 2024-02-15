export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Movie = {
  id: Id;
  columnId: Id;
  name: string;
  review: string;
  movie?: any;
};

export interface KanbadContainerProps {
  id: Id;
  children?: React.ReactNode;
  title?: string;
  movies: Movie[];
  column?: Column;
}
