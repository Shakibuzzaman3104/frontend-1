"use client";
import Search from "@/components/Search";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { fetchMovies } from "@/app/redux/slices/movie.slice";
import AddNewMovie from "@/components/AddNewMovie";
import KarbanContainer from "@/components/KarbanContainer";
import { defaultColumns } from "@/constant/movies";
import { Column } from "@/types";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";

const Kanban = () => {
  const [search, setSearch] = useState("");
  const [kanbanColumns, setKanbanColumns] = useState<Column[]>(defaultColumns);
  const dispatch = useDispatch();

  const movies = useSelector((state: any) => state.movies);
  console.log("movies", movies);

  useEffect(() => {
    dispatch<any>(fetchMovies());
  }, [dispatch]);

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
                movies={movies.filter((m: any) => m.columnId === column.id)}
              ></KarbanContainer>
            ))}
          </div>
        </div>
      </div>
      <AddNewMovie movies={movies} open={open} handleClose={handleClose} />
    </>
  );
};

export default Kanban;
