import { Movie } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { useState } from "react";
import ActionModal from "./ActionModal";

const MovieCard = ({ id, columnId, name, review, movie }: Movie) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (event: any) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "Movie",
      movie,
    },
    disabled: open,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (open) {
    return (
      <ActionModal
        open={open}
        handleClose={handleClose}
        initialMovie={{ id, columnId, name, review }}
      />
    );
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={clsx(
          "flex items-center justify-between w-full p-4 rounded-[6px] cursor-grab min-h-[100px] opacity-50",
          columnId === "watchlist"
            ? "bg-gray-200"
            : columnId === "watching"
            ? "bg-purple-600"
            : "bg-gray-400"
        )}
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "flex items-center justify-between w-full p-4 rounded-[6px] cursor-grab min-h-[100px]",
        columnId === "watchlist"
          ? "bg-gray-200"
          : columnId === "watching"
          ? "bg-purple-600"
          : "bg-gray-400",
        isDragging ? "opacity-70" : "opacity-100"
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
      <button
        className="text-white text-xs px-2 bg-black rounded-sm py-[1px] cursor-pointer"
        onClick={handleOpen}
      >
        Edit
      </button>
    </div>
  );
};

export default MovieCard;
