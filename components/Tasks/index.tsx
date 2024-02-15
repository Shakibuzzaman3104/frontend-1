import { ITask } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Tasks = ({ id, title, review }: ITask) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer
      ${isDragging && "opacity-50"}`}
    >
      <div className="flex items-center justify-between" {...listeners}>
        <p> {title}</p>
        <p>{review}</p>
      </div>
    </div>
  );
};

export default Tasks;
