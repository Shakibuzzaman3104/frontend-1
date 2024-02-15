import { KanbadContainerProps, Movie } from "@/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { useMemo } from "react";
import MovieCard from "./MovieCard";

const KarbanContainer = ({
  id,
  children,
  title,
  movies,
  column,
}: KanbadContainerProps) => {
  const moviesIds = useMemo(() => {
    return movies.map((m: any) => m.id);
  }, [movies]);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id,
      data: {
        type: "Column",
        column,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "min-w-[250px] h-[500px] max-h-[500px] p-4 rounded-md flex flex-col gap-y-4",
        id === "watchlist"
          ? "bg-red-200"
          : id === "watching"
          ? "bg-cyan-300"
          : "bg-green-600"
      )}
    >
      <div
        className="flex flex-col w-full h-full justify-start"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-black font-semibold">{title}</h1>
        </div>
        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-auto items-center space-y-8 p-2">
          <SortableContext items={moviesIds}>
            {movies.map((movie: Movie) => (
              <MovieCard movie={movie} {...movie} key={movie.id} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default KarbanContainer;
