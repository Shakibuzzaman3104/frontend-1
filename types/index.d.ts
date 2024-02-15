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
};

export interface KanbadContainerProps {
  id: Id;
  children?: React.ReactNode;
  title?: string;
}

export interface ITask {
  id: UniqueIdentifier;
  title: string;
  review: string;
}
