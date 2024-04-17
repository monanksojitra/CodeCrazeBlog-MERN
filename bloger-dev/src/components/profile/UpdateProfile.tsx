import React from "react";
import InputBox from "../UI/Input";
import { useForm } from "react-hook-form";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };
  return (
    <>
      <section className="">
        <div className="w-full bg-white px-7 py-5 rounded-lg mx-auto mt-3">
          <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  My account
                </h6>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="bg-blue-600 text-white active:bg-blue-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-7 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <InputBox
                        error={errors.username?.message}
                        placeholder="Enter username"
                        register={register("username", {
                          required: "Username is required",
                        })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email address
                      </label>
                      <InputBox
                        error={errors.email?.message}
                        placeholder="Enter email"
                        register={register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        First Name
                      </label>
                      <InputBox
                        error={errors.firstName?.message}
                        placeholder="Enter first name"
                        register={register("firstName", {
                          required: "First name is required",
                        })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Last Name
                      </label>
                      <InputBox
                        error={errors.lastName?.message}
                        placeholder="Enter last name"
                        register={register("lastName", {
                          required: "Last name is required",
                        })}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-3 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Address
                      </label>
                      <InputBox
                        error={errors.address?.message}
                        placeholder="Enter Your Address"
                        register={register("address", {
                          required: "Address is required",
                        })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        City
                      </label>
                      <InputBox
                        error={errors.city?.message}
                        placeholder="Enter Your City"
                        register={register("city", {
                          required: "City is required",
                        })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Country
                      </label>
                      <InputBox
                        error={errors.country?.message}
                        placeholder="Enter Your Country"
                        register={register("country", {
                          required: "Country is required",
                        })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Postal Code
                      </label>
                      <InputBox
                        error={errors.postalcode?.message}
                        placeholder="Enter Your Postal Code"
                        register={register("postalcode", {
                          required: "Postal Code is required",
                        })}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  About Me
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <textarea
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-600 focus-visible:shadow-none dark:border-dark-3 dark:text-black"
                      placeholder="About me"
                      {...register("aboutme", {
                        required: "About Me is required",
                      })}
                    />
                    {errors?.aboutme?.message && (
                      <div className="text-red-500 text-sm">
                        <p>{errors.aboutme?.message as string}</p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
