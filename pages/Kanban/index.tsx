"use client";
import Search from "@/components/Search";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

import AddNewTask from "@/components/AddNewTask";
import KarbanContainer from "@/components/KarbanContainer";
import { defaultColumns, defaultMovies } from "@/constant/movies";
import { Column, Movie } from "@/types";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const Kanban = () => {
  const [search, setSearch] = useState("");
  const [kanbanColumns, setKanbanColumns] = useState<Column[]>(defaultColumns);
  const [movies, setMovies] = useState<Movie[]>(defaultMovies);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <AddNewTask
        movies={movies}
        setMovies={setMovies}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default Kanban;
