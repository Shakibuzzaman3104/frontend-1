"use client";
import Search from "@/components/Search";
import {
  DndContext,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";

import { moveMovie, setMovies } from "@/app/redux/slices/movie.slice";
import ActionModal from "@/components/ActionModal";
import DraggingOverlay from "@/components/DraggingOverlay";
import KarbanContainer from "@/components/KarbanContainer";
import { defaultColumns } from "@/constant/movies";
import { Column, Movie } from "@/types";
import { fetchMovies } from "@/utils/getMovies.util";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
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
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!search) {
      setFilteredMovies(movies);
    }
  }, [movies, search]);

  const handleSearch = () => {
    const filtered = movies.filter((movie: Movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      dispatch(setMovies(JSON.parse(storedMovies)));
    } else {
      dispatch<any>(fetchMovies());
    }
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

    if (isActiveMovie && isOverAColumn) {
      const activeIndex = filteredMovies.findIndex(
        (t: any) => t.id === activeId
      );
      const updatedMovies = [
        ...filteredMovies.slice(0, activeIndex),
        {
          ...filteredMovies[activeIndex],
          columnId: overId,
        },
        ...filteredMovies.slice(activeIndex + 1),
      ];
      dispatch(moveMovie({ id: activeId, columnId: overId }));
      return;
    }

    if (isActiveMovie && isOverMovie) {
      const activeIndex = filteredMovies.findIndex(
        (t: any) => t.id === activeId
      );
      const overIndex = filteredMovies.findIndex((t: any) => t.id === overId);

      // Check if the active movie is being moved within the same column
      if (
        filteredMovies[activeIndex].columnId ===
        filteredMovies[overIndex].columnId
      ) {
        // Update the order of movies within the same column
        const updatedMovies = arrayMove(filteredMovies, activeIndex, overIndex);
        dispatch(setMovies(updatedMovies));
      } else {
        // Move the movie to another column
        dispatch(
          moveMovie({
            id: activeId,
            columnId: filteredMovies[overIndex].columnId,
          })
        );
      }
      return;
    }
  }

  return (
    <>
      <div className="flex flex-col bg-gray-400 p-12 lg:p-24 lg:pt-8 w-full min-h-full">
        <div className="flex flex-row justify-end w-full">
          <div className="flex w-[60%]">
            <Search
              setSearch={setSearch}
              search={search}
              handleSearch={handleSearch}
            />
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-32">
              <SortableContext items={columnIds}>
                {kanbanColumns.map((column, index) => (
                  <KarbanContainer
                    key={column.id}
                    id={column.id}
                    column={column}
                    title={column.title}
                    movies={filteredMovies.filter(
                      (m: any) => m.columnId === column.id
                    )}
                  ></KarbanContainer>
                ))}
              </SortableContext>
            </div>
          </div>
          {activeMovie && <DraggingOverlay activeMovie={activeMovie} />}
        </DndContext>
      </div>
      <ActionModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Kanban;
