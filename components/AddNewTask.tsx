import { Movie } from "@/types";
import { generateId } from "@/utils/generateId.util";
import { Modal } from "@mui/material";
import { useForm } from "react-hook-form";

const AddNewTask = ({ movies, setMovies, open, handleClose }: any) => {
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] bg-white shadow-lg p-10 rounded focus:outline-none">
          <form
            className="w-full h-full flex flex-col items-center justify-center gap-6 focus:outline-none"
            onSubmit={handleSubmit(addNewMovie)}
          >
            <div className="flex flex-col gap-1 w-full">
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.review.message}
                </p>
              )}
            </div>

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
    </div>
  );
};

export default AddNewTask;
