import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InputBox from "./UI/Input";

const Signup = () => {
  const { register: registerUser } = useAuth();
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

  const onSubmit = async (formData: { username: string; password: string }) => {
    try {
      console.log(formData);
      await registerUser(formData);
      // Redirect or do something on successful registration
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex h-screen p-5 flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background*/}
          <div className="hidden md:block mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          {/* Right column container with form */}
          <div className="w-full md:w-8/12 lg:ms-6 lg:w-5/12">
            <Link to="/" className="flex items-center justify-end gap-x-1 p-5">
              {/* Add your back button SVG here */}
            </Link>
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-4 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <Link
                  to="/"
                  className="uppercase text-nowrap  text-xl font-bold mx-auto inline-block max-w-[160px]"
                >
                  monak sojitra
                </Link>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputBox
                  type="text"
                  placeholder="Username"
                  register={register("username", {
                    required: "username is required",
                  })}
                  error={errors?.username?.message || ""}
                />

                <InputBox
                  type="password"
                  placeholder="Password"
                  register={register("password", {
                    required: "Password is required",
                  })}
                  error={errors?.password?.message || ""}
                />

                <div className="mb-10">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-md border border-blue-500 bg-blue-600 px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <Link
                to="/forgot"
                className="mb-2 inline-block text-base text-white hover:text-blue-600 hover:underline dark:text-black/50"
              >
                Forget Password?
              </Link>
              <p className="text-base text-white dark:text-black/50">
                <span className="pr-0.5">Not a member yet?</span>
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
