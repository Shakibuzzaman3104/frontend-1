"use client";
import Search from "@/components/Search";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

import KarbanContainer from "@/components/KarbanContainer";
import { defaultColumns, defaultMovies } from "@/constant/movies";
import { Column, Movie } from "@/types";
import { generateId } from "@/utils/generateId.util";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";

const Kanban = () => {
  const [search, setSearch] = useState("");
  const [kanbanColumns, setKanbanColumns] = useState<Column[]>(defaultColumns);
  const [movies, setMovies] = useState<Movie[]>(defaultMovies);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      review: "",
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewMovie = (values: any) => {
    if (!values.name || !values.review) {
      if (!values.name) {
        setError("name", {
          type: "manual",
          message: "Name is required",
        });
      }
      if (!values.review) {
        setError("review", {
          type: "manual",
          message: "Review is required",
        });
      }
      return;
    }

    const newMovie: Movie = {
      id: generateId(),
      name: values.name,
      review: values.review,
      columnId: "watchlist",
    };
    setMovies([...movies, newMovie]);
    handleClose();
    console.log(newMovie);
  };

  return (
    <>
      <div className="flex flex-col bg-gray-400 p-12 lg:p-24 lg:pt-8 w-full min-h-full">
        <div className="flex flex-row justify-end w-full">
          <div className="flex w-[60%]">
            <Search setSearch={setSearch} search={search} />
          </div>
          <button
            className="bg-indigo-600 px-6 min-w-[120px] h-[45px] rounded-full ml-6 sm:ml-10 focus:outline-none outline-none"
            onClick={handleOpen}
          >
            Add New
          </button>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-3 gap-12 lg:gap-32">
            {kanbanColumns.map((column, index) => (
              <KarbanContainer
                key={column.id}
                id={column.id}
                title={column.title}
              ></KarbanContainer>
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] bg-white shadow-lg p-10 rounded">
          <form
            className="w-full h-full flex flex-col items-center justify-center gap-6"
            onSubmit={handleSubmit(addNewMovie)}
          >
            <input
              type="text"
              id="email"
              {...register("name")}
              className={`px-4 py-3 rounded-md h-[50px] w-full rounded border bg-gray-400 text-black focus:border-none focus:outline-none outline-none placeholder:text-black ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Write name..."
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}

            <input
              type="text"
              id="review"
              {...register("review")}
              className={`px-4 py-3 rounded-md h-[50px] w-full rounded border bg-gray-400 text-black focus:border-none focus:outline-none outline-none placeholder:text-black ${
                errors.review ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Write review..."
            />
            {errors.review && (
              <p className="text-red-500 text-xs mt-1">
                {errors.review.message}
              </p>
            )}

            <div className="flex gap-6 mt-4">
              <button
                className="bg-green-500 px-6 h-[35px] rounded text-white"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-red-500 px-6 h-[35px] rounded text-white"
                type="submit"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Kanban;
