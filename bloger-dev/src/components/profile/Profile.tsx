import Popup from "reactjs-popup";
import UpdateProfile from "./UpdateProfile";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AlertBox from "../UI/AlertBox";
import { IconInfoCircle } from "@tabler/icons-react";

const Profile = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const { deleteProfile } = useAuth();
  const handelProfileDelete = async () => {
    await deleteProfile();
    setAlert(false);
  };
  return (
    <>
      <Popup
        modal
        open={modelOpen}
        lockScroll={true}
        onClose={() => setModelOpen(false)}
      >
        <UpdateProfile />
      </Popup>
      <AlertBox
        AlertIcon={IconInfoCircle}
        alertCss="text-red-500"
        accept={handelProfileDelete}
        message={{
          message: "Are you sure you want to delete your profile?",
          header: "Delete Profile",
        }}
        reject={() => setAlert(false)}
        alertOpen={alert}
        setAlertOpen={setAlert}
        confirmButtonCss="bg-red-500 text-white"
        confirmButtonText="Yes"
      />
      <main>
        <section className="relative block h-[20rem] ">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            />
          </div>
        </section>
        <section className="relative py-16 -translate-y-60 bg-blueGray-200">
          <div className="container mx-auto px-5 md:px-9 lg:px-14 xl:px-40">
            <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full relative h-20 lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="h-40 -top-16 absolute aspect-square rounded-full">
                      <img
                        alt="..."
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-full aspect-square align-middle border-none "
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4  lg:order-3 lg:text-right lg:self-center">
                    <div className="pt-10  px-3 flex-col gap-2 sm:flex-row lg:pt-0 flex items-center justify-center">
                      <button
                        onClick={() => setModelOpen(true)}
                        className="bg-blue-600  active:bg-blue-400 uppercase text-white font-bold hover:shadow-md shadow text-xs px-6 h-8 rounded outline-none focus:outline-none ease-linear transition-all duration-150 text-nowrap"
                        type="button"
                      >
                        Edit Profile
                      </button>
                      <button
                        onClick={() => setAlert(true)}
                        className=" border border-rounded border-red-500 hover:bg-red-500 hover:text-white uppercase text-red-500 font-bold hover:shadow-md shadow text-xs px-4 h-8 rounded ease-linear transition-all duration-150 text-nowrap"
                        type="button"
                      >
                        Delete Profile
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4">
                      <div className=" p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400 font-medium">
                          Likes
                        </span>
                      </div>
                      <div className=" p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400 font-medium">
                          Photos
                        </span>
                      </div>
                      <div className=" p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400 font-medium">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    Jenna Stones
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                    Los Angeles, California
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400" />
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
