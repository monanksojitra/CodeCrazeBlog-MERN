import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import InputBox from "../UI/Input";
import { IconHome } from "@tabler/icons-react";
import { toast } from "react-toastify";

const Signup = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      await registerUser(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle registration error
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex h-screen p-5 flex-wrap items-center justify-center lg:justify-between">
          <div className="hidden lg:block mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="w-full md:w-8/12 lg:w-5/12 shadow-lg rounded-xl">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-5 py-12 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <Link to="/" className="absolute top-3 right-3">
                <IconHome className="text-gray-500 cursor-pointer" />
              </Link>
              <div className="mb-10 text-center md:mb-16">
                <Link
                  to="/"
                  className="uppercase text-nowrap text-xl font-bold mx-auto inline-block max-w-[160px]"
                >
                  monak sojitra
                </Link>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputBox
                  type="text"
                  placeholder="Username"
                  register={register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Username can only contain letters and numbers",
                    },
                  })}
                  error={errors?.username?.message || ""}
                />
                <InputBox
                  type="email"
                  placeholder="Email"
                  register={register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors?.email?.message || ""}
                />
                <InputBox
                  type="password"
                  placeholder="Password"
                  register={register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
                    },
                  })}
                  error={errors?.password?.message || ""}
                />
                <InputBox
                  type="password"
                  placeholder="Confirm Password"
                  register={register("confirm_password", {
                    required: "Confirm Password is required",
                    validate: (value) => {
                      if (value !== watch("password")) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                  error={errors?.confirm_password?.message || ""}
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
