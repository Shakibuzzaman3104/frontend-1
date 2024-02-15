import { KanbadContainerProps } from "@/types";
import clsx from "clsx";

const KarbanContainer = ({
  id,
  children,
  title,
  movies,
}: KanbadContainerProps) => {
  console.log(movies);
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
      <div className="flex flex-col items-center justify-center space-y-8 p-2 overflow-y-auto pt-8">
        {movies.map((movie: any) => (
          <div
            key={movie.id}
            className={clsx(
              "flex items-center w-full p-4 rounded-[6px]",
              movie.columnId === "watchlist"
                ? "bg-gray-200"
                : movie.columnId === "watching"
                ? "bg-purple-600"
                : "bg-gray-400"
            )}
          >
            <div
              className={clsx(
                "flex flex-col gap-1",
                movie.columnId === "watching" ? "text-white" : "text-black"
              )}
            >
              <p className="text-[14px]">Name: {movie.name}</p>
              <p className="text-[12px]">Review: {movie.review}</p>
            </div>
            <button className="text-white text-xs px-2 bg-black rounded-sm py-[1px]">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KarbanContainer;
