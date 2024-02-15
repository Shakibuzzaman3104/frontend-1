import { Movie } from "@/types";
import clsx from "clsx";

const MovieCard = ({ id, columnId, name, review }: Movie) => {
  return (
    <div
      key={id}
      className={clsx(
        "flex items-center justify-between w-full p-4 rounded-[6px]",
        columnId === "watchlist"
          ? "bg-gray-200"
          : columnId === "watching"
          ? "bg-purple-600"
          : "bg-gray-400"
      )}
    >
      <div
        className={clsx(
          "flex flex-col gap-1",
          columnId === "watching" ? "text-white" : "text-black"
        )}
      >
        <p className="text-[14px]">Name: {name}</p>
        <p className="text-[12px]">Review: {review}</p>
      </div>
      <button className="text-white text-xs px-2 bg-black rounded-sm py-[1px]">
        Edit
      </button>
    </div>
  );
};

export default MovieCard;
