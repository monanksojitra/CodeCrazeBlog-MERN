import React, { useState } from "react";
import { Link } from "react-router-dom";
import LinkItem from "./UI/LinkItem";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, account } = useAuth();
  return (
    <header className={`flex w-full items-center bg-white dark:bg-gray-900`}>
      <div className="container">
        <div className="relative max-sm:pl-3 px-5 flex items-center justify-between">
          <div className="w-60 max-w-full md:px-4">
            <a
              href="/#"
              className="block dark:text-white text-nowrap font-bold w-full py-5 text-xl uppercase"
            >
              monank sojitra
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-blue-600 focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-gray-500    "></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-gray-500    "></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-gray-500    "></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex ">
                  <LinkItem NavLink="/">Home</LinkItem>
                  <LinkItem NavLink="/blogs">Blogs</LinkItem>
                  <LinkItem NavLink="/about">About</LinkItem>
                  <LinkItem NavLink="/contact">Contact</LinkItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end items-center pr-16 sm:flex lg:pr-0">
              {isLoggedIn ? (
                <div className="rounded-md bg-blue-600 px-7 py-3 text-base font-medium text-white hover:bg-blue-600/90">
                  add post
                </div>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-7 py-3 text-base font-medium text-white hover:text-blue-600 dark:text-white"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/signup"
                    className="rounded-md bg-blue-600 px-7 py-3 text-base font-medium text-white hover:bg-blue-600/90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <div className="h-12 relative aspect-square rounded-full ml-7 bg-white outline outline-gray-400">
                <img
                  src="https://i.pravatar.cc/300"
                  className="rounded-full "
                />
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                    account ? "bg-green-500" : "bg-red-500"
                  } `}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
