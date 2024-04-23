import { Link, useNavigate } from "react-router-dom";
import InputBox from "./UI/Input";
import { IconHome } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = () => {
    toast.success(
      "Password reset link sent to your email {its just a test page after some time it will be done !!}"
    );
    navigator("/");
  };
  return (
    <div className="container mx-auto ">
      <div className="flex h-screen  flex-wrap items-center justify-center">
        {/* Left column container with background*/}
        <div className="hidden sm:block mb-12 md:mb-0 md:w-8/12 lg:w-4/12">
          <img src="/forget.svg" className="w-full" alt="Phone image" />
        </div>
        {/* Right column container with form */}
        <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
          <div className="relative mx-auto max-w-[525px] shadow-lg overflow-hidden rounded-lg bg-white px-4 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
            <Link to="/" className="absolute top-3 right-3">
              <IconHome className="text-gray-500 cursor-pointer" />
            </Link>
            <div className="mb-10  flex flex-col gap-y-2 items-center justify-center md:mb-16">
              <p className="uppercase text-nowrap  text-xl font-bold">
                Forgot Your Password?
              </p>
              <p className="text-sm font-medium text-gray-400">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputBox
                error={errors?.username?.message}
                register={register("username", {
                  required: "Username is required",
                })}
                type="username"
                placeholder="Enter Your Username"
              />

              <div className="mb-10">
                <input
                  type="submit"
                  value="Reset Password"
                  className="w-full cursor-pointer rounded-md border border-blue-500 bg-blue-600 px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>

            <Link
              to="/signup"
              className="mb-2 inline-block text-base text-white hover:text-blue-600 hover:underline dark:text-black/50"
            >
              Create an account
            </Link>
            <p className="text-base text-white dark:text-black/50">
              <span className="pr-0.5">Already have an account?</span>
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
