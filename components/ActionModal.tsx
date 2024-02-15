import { addMovie, editMovie } from "@/app/redux/slices/movie.slice";
import { Movie } from "@/types";
import { generateId } from "@/utils/generateId.util";
import { Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ActionModal = ({ open, handleClose, initialMovie }: any) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialMovie ? initialMovie.name : "",
      review: initialMovie ? initialMovie.review : "",
    },
  });

  const addOrUpdateMovie = (values: any) => {
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

    const movieData: Movie = {
      id: initialMovie ? initialMovie.id : generateId(),
      name: values.name,
      review: values.review,
      columnId: initialMovie ? initialMovie.columnId : "watchlist",
    };

    if (initialMovie) {
      dispatch(editMovie(movieData));
    } else {
      dispatch(addMovie(movieData));
    }
    handleClose();
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
            onSubmit={handleSubmit(addOrUpdateMovie)}
          >
            <div className="flex flex-col gap-1 w-full">
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`px-4 py-3 rounded-md h-[50px] w-full rounded border bg-gray-400 text-black focus:border-none focus:outline-none outline-none placeholder:text-black ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Write name..."
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message as string}
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
                  {errors.review.message as string}
                </p>
              )}
            </div>

            <div className="flex gap-6 mt-4">
              <button
                className="bg-green-500 px-6 h-[35px] rounded text-white"
                type="submit"
              >
                {initialMovie ? "Update" : "Save"}
              </button>
              <button
                className="bg-red-500 px-6 h-[35px] rounded text-white"
                type="button"
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

export default ActionModal;
