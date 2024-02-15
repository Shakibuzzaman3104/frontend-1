import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import MovieCard from "./MovieCard";

const DraggingOverlay = ({ activeMovie }: any) => {
  return (
    <div>
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
    </div>
  );
};

export default DraggingOverlay;
