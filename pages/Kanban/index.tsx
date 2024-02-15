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

const Kanban = () => {
  const [search, setSearch] = useState("");
  const [kanbanColumns, setKanbanColumns] = useState<Column[]>(defaultColumns);
  const [movies, setMovies] = useState<Movie[]>(defaultMovies);
  const [newMovie, setNewMovie] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewMovie = () => {
    const newMovie: Movie = {
      id: generateId(),
      name: "",
      review: "",
      columnId: "watchlist",
    };
    console.log(newMovie);
  };

  return (
    <div className="flex flex-col bg-gray-400 p-8 sm:p-24 sm:pt-8 w-full min-h-full">
      <div className="flex flex-row justify-end w-full">
        <div className="flex w-[60%]">
          <Search setSearch={setSearch} search={search} />
        </div>
        <button
          className="bg-indigo-600 px-6 min-w-[120px] h-[45px] rounded-full ml-6 sm:ml-10"
          onClick={addNewMovie}
        >
          Add New
        </button>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-3 gap-32">
          {kanbanColumns.map((column, index) => (
            <KarbanContainer
              key={column.id}
              id={column.id}
              title={column.title}
            ></KarbanContainer>
          ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-6 mt-10">
        <DndContext sensors={sensors} collisionDetection={closestCorners}>
          <SortableContext items={containers.map((i: any) => i.id)}>
            {containers.map((container: any) => (
              <KarbanContainer
                id={container.id}
                title={container.title}
                key={container.id}
                // onAddItem={() => {
                //   setShowAddItemModal(true);
                //   setCurrentContainerId(container.id);
                // }}
              >
                <SortableContext items={container.items.map((i) => i.id)}>
                  <div className="flex items-start flex-col gap-y-4">
                    {container.items.map((i: any) => (
                      <Tasks
                        title={i.title}
                        id={i.id}
                        key={i.id}
                        review={i.review}
                      />
                    ))}
                  </div>
                </SortableContext>
              </KarbanContainer>
            ))}
          </SortableContext>
        </DndContext>
      </div> */}
    </div>
  );
};

export default Kanban;
