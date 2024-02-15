"use client";
import Search from "@/components/Search";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";

import ActionModal from "@/components/ActionModal";
import KarbanContainer from "@/components/KarbanContainer";
import MovieCard from "@/components/MovieCard";
import { defaultColumns } from "@/constant/movies";
import { Column, Movie } from "@/types";
import { fetchMovies } from "@/utils/getMovies.util";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

const Kanban = () => {
  const [search, setSearch] = useState("");
  const [kanbanColumns, setKanbanColumns] = useState<Column[]>(defaultColumns);

  const columnIds = useMemo(() => {
    return kanbanColumns.map((c: Column) => {
      return c.id;
    });
  }, [kanbanColumns]);

  const dispatch = useDispatch();
  const movies = useSelector((state: any) => state.movies);
  const [allMovies, setAllMovies] = useState<Movie[]>(movies);

  useEffect(() => {
    setAllMovies(movies);
  }, [movies]);

  useEffect(() => {
    dispatch<any>(fetchMovies());
  }, [dispatch]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Dragging events

  const [activeMovie, setActiveMovie] = useState<Movie | null>();

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Movie") {
      setActiveMovie(event.active.data.current.movie);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveMovie = active.data.current?.type === "Movie";
    const isOverMovie = over.data.current?.type === "Movie";

    if (!isActiveMovie) return;

    const isOverAColumn = over.data.current?.type === "Column";
    console.log(isOverAColumn);

    // Im dropping a Task over a column
    if (isActiveMovie && isOverAColumn) {
      setAllMovies((movies: any) => {
        const activeIndex = movies.findIndex((t: any) => t.id === activeId);

        movies[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(movies, activeIndex, activeIndex);
      });
    }
    // Im dropping a Task over another Task
    if (isActiveMovie && isOverMovie) {
      setAllMovies((movies: any) => {
        const activeIndex = movies.findIndex((t: any) => t.id === activeId);
        const overIndex = movies.findIndex((t: any) => t.id === overId);

        if (movies[activeIndex].columnId != movies[overIndex].columnId) {
          movies[activeIndex].columnId = movies[overIndex].columnId;
          return arrayMove(movies, activeIndex, overIndex - 1);
        }

        return arrayMove(movies, activeIndex, overIndex);
      });
    }
  }

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

        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        >
          <div className="mt-10">
            <div className="grid grid-cols-3 gap-12 lg:gap-32">
              <SortableContext items={columnIds}>
                {kanbanColumns.map((column, index) => (
                  <KarbanContainer
                    key={column.id}
                    id={column.id}
                    column={column}
                    title={column.title}
                    movies={allMovies.filter(
                      (m: any) => m.columnId === column.id
                    )}
                  ></KarbanContainer>
                ))}
              </SortableContext>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeMovie && (
                <MovieCard
                  id={activeMovie.id}
                  columnId={activeMovie.columnId}
                  name={activeMovie.name}
                  review={activeMovie.review}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
      <ActionModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Kanban;
