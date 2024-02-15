import { KanbadContainerProps } from "@/types";

const KarbanContainer = ({ id, children, title }: KanbadContainerProps) => {
  return (
    <div
      className={`w-full min-h-[500px] p-4 rounded-md flex flex-col gap-y-4 ${
        id === "watchlist"
          ? "bg-red-200"
          : id === "watching"
          ? "bg-cyan-300"
          : "bg-green-600"
      }`}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-black font-semibold">{title}</h1>
      </div>

      {children}
      {/* <Button variant="ghost" onClick={onAddItem}>
        Add Item
      </Button> */}
    </div>
  );
};

export default KarbanContainer;
