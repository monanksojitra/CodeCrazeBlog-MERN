import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import InputBox from "../UI/Input";
import { Dispatch, SetStateAction } from "react";
type Props = {
  modelOpen: Dispatch<SetStateAction<boolean>>;
  defaultValues: any;
  setDefaultValues: Dispatch<SetStateAction<any>>;
};
const CreateAndEditBlog = ({
  modelOpen,
  defaultValues,
  setDefaultValues,
}: Props) => {
  const { addNewPost, updateBlog } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", data.file[0]);
    console.log(defaultValues);
    if (!defaultValues) {
      await addNewPost(formData);
      setDefaultValues({});
      modelOpen(false);
    } else {
      await updateBlog(formData, defaultValues._id);
      setDefaultValues({});
      modelOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center overflow-auto justify-center p-5 w-full">
        <div className="mx-auto w-full max-w-[45rem] bg-white">
          <form
            className="p-5 lg:py-6 lg:px-9"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="mb-2">
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-500"
              >
                Title
              </label>
              <InputBox
                type="text"
                placeholder="Enter Title"
                register={register("title", {
                  required: "title is required",
                })}
                error={errors.title?.message}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-500"
              >
                Description
              </label>
              <textarea
                className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-600 focus-visible:shadow-none dark:border-dark-3 dark:text-black"
                placeholder="description"
                {...register("description", {
                  required: "description is required",
                })}
              />
              {errors?.description?.message && (
                <div className="text-red-500 text-sm">
                  <p>{errors.description?.message as string}</p>
                </div>
              )}
            </div>

            <div className="my-3">
              <label className="mb-3 block text-xl font-semibold text-blue-600">
                Upload File
              </label>
              <div className="mb-4">
                <input
                  type="file"
                  id="file"
                  className="sr-only"
                  {...register("file", { required: "file is required" })}
                />
                <label
                  htmlFor="file"
                  className={`relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed ${
                    errors.cover ? "border-red-500" : "border-[#e0e0e0]"
                  } p-12 text-center`}
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-blue-600">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-blue-600">
                      Browse
                    </span>
                  </div>
                </label>
                {errors?.cover?.message && (
                  <div className="text-red-500 text-sm">
                    <p>{errors?.cover?.message as string}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button className="hover:shadow-form w-full rounded-md bg-blue-500 hover:bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Upload
              </button>
              <button
                onClick={() => modelOpen(false)}
                type="button"
                className="hover:shadow-form w-full rounded-md  hover:outline outline-1 outline-gray-400 hover:outline-red-500 py-2 px-6 text-center text-base font-semibold text-gary-600 hover:text-red-500 outline-none"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAndEditBlog;
