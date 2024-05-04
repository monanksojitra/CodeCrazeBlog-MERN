import { useForm } from "react-hook-form";
import InputBox from "./UI/Input";
import { useAuth } from "../contexts/AuthContext";
import { Dispatch, SetStateAction } from "react";

const CreateBlog = ({
  setPopover,
}: {
  setPopover: Dispatch<SetStateAction<boolean>>;
}) => {
  const { addNewPost } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      file: null,
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", data.file[0]);
    try {
      addNewPost(formData);
      setPopover(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <section className="p-10 bg-white rounded-xl">
      <div className="relative p-1 overflow-hidden rounded-lg text-center dark:bg-dark-2">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <InputBox
            type="text"
            placeholder="Post Title"
            register={register("title", {
              required: "Title is required",
            })}
            error={errors?.title?.message || ""}
          />
          <textarea
            placeholder="Post Description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded-md border border-stroke bg-transparent p-3 text-base text-body-color outline-none focus:border-blue-600 focus-visible:shadow-none dark:border-dark-3 dark:text-black"
          />
          {errors?.description && (
            <span className="text-red-500 flex items-start justify-start text-sm">
              {errors?.description?.message}
            </span>
          )}
          <input
            {...register("file", {
              required: "Post cover is required",
            })}
            type="file"
            accept="image/*"
            className="w-full rounded-md border mt-4 border-stroke bg-transparent file:px-5 file:py-3 file:bg-gray-500 file:border-0 text-base file:text-sm text-body-color outline-none focus:border-blue-600 focus-visible:shadow-none dark:text-black"
          />
          {errors?.file && (
            <span className="text-red-500 flex items-start justify-start text-sm">
              {errors?.file?.message}
            </span>
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md border border-blue-500 bg-blue-600 px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
