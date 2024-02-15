import { KanbadContainerProps, Movie } from "@/types";
import clsx from "clsx";
import MovieCard from "./MovieCard";

const KarbanContainer = ({
  id,
  children,
  title,
  movies,
}: KanbadContainerProps) => {
  return (
    <div
      className={clsx(
        "w-full min-h-[500px] max-h-screen overflow-hidden p-4 rounded-md flex flex-col gap-y-4",
        id === "watchlist"
          ? "bg-red-200"
          : id === "watching"
          ? "bg-cyan-300"
          : "bg-green-600"
      )}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-black font-semibold">{title}</h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-8 p-2 overflow-y-auto">
        {movies.map((movie: Movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default KarbanContainer;
