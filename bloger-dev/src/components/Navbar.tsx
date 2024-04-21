import React, { useState } from "react";
import { Link } from "react-router-dom";
import LinkItem from "./UI/LinkItem";
import { useAuth } from "../contexts/AuthContext";
import CreateBlog from "./CreateBlog";
import Popup from "reactjs-popup";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logout, isLoggedIn, account } = useAuth();
  const [popover, setPopover] = useState(false);
  return (
    <header className={`flex w-full items-center bg-white dark:bg-gray-900`}>
      <Popup modal open={popover} onClose={() => setPopover(false)}>
        <CreateBlog setPopover={setPopover} />
      </Popup>
      <div className="container mx-auto">
        <div className="relative max-sm:pl-3 px-5 flex items-center justify-between">
          <div className="w-60 max-w-full md:px-4">
            <a
              href="/#"
              className="block dark:text-white text-nowrap font-bold w-full py-5 text-xl uppercase"
            >
              monank sojitra
            </a>
          </div>
          <div className="flex w-full items-center justify-end px-4">
            <div className="mx-auto hidden lg:block">
              <nav
                id="navbarCollapse"
                className="dark:bg-dark-2 w-full  dark:text-white text-gray-900 "
              >
                <ul className="flex gap-x-10">
                  <LinkItem NavLink="/">Home</LinkItem>
                  <LinkItem NavLink="/blogs">Blogs</LinkItem>
                  <LinkItem NavLink="/about">About</LinkItem>
                  {isLoggedIn && (
                    <LinkItem NavLink="/profile">Profile</LinkItem>
                  )}
                </ul>
              </nav>
            </div>
            <div className="flex">
              <div className=" hidden md:flex justify-end items-center">
                {isLoggedIn ? (
                  <div
                    onClick={() => setPopover(true)}
                    className="rounded-md bg-blue-600 px-7  py-3 text-base font-medium text-white hover:bg-blue-600/90"
                  >
                    add post
                  </div>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="px-7 py-3 text-base  font-medium text-white hover:text-blue-600 dark:text-white"
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
              </div>
              <div
                className="h-12 relative aspect-square rounded-full ml-7 bg-white outline outline-gray-400"
                onClick={() => setOpen(!open)}
              >
                <img
                  src="https://i.pravatar.cc/300"
                  className="rounded-full cursor-pointer"
                />
                <div
                  className={`absolute  bottom-0 right-0 h-3 w-3 rounded-full ${
                    account ? "bg-green-500" : "bg-red-500"
                  } `}
                ></div>
                <div
                  className={`absolute z-50  right-4 top-14 text-white dark:text-gray-900 rounded-lg bg-white  shadow ${
                    !open && "hidden"
                  }`}
                >
                  <div className="text-base border-b px-5 py-3 font-bold text-gray-900">
                    <p>{account?.username || "Guest"}</p>
                  </div>
                  <ul className="px-14 py-3">
                    <LinkItem style="dark:text-gray-900 lg:hidden" NavLink="/">
                      Home
                    </LinkItem>
                    <LinkItem
                      style="dark:text-gray-900 lg:hidden"
                      NavLink="/blogs"
                    >
                      Blogs
                    </LinkItem>
                    <LinkItem
                      style="dark:text-gray-900 lg:hidden"
                      NavLink="/about"
                    >
                      About
                    </LinkItem>
                    {isLoggedIn && (
                      <LinkItem
                        style="dark:text-gray-900 lg:hidden"
                        NavLink="/profile"
                      >
                        Profile
                      </LinkItem>
                    )}

                    {account ? (
                      <>
                        <div
                          onClick={() => setPopover(true)}
                          className=" py-2 text-nowrap text-base font-medium text-body-color hover:text-dark dark:text-blue-600 dark:hover:text-black inline-flex md:hidden"
                        >
                          add post
                        </div>
                        <LinkItem
                          style="dark:text-blue-600 dark:hover:text-black"
                          NavLink="/"
                          onClick={() => logout()}
                        >
                          Logout
                        </LinkItem>
                      </>
                    ) : (
                      <div className="md:hidden">
                        <LinkItem
                          style="dark:text-blue-600 dark:hover:text-black "
                          NavLink="/signin"
                          onClick={() => logout()}
                        >
                          Singin
                        </LinkItem>{" "}
                        <LinkItem
                          style="dark:text-blue-600 dark:hover:text-black"
                          NavLink="/signup"
                          onClick={() => logout()}
                        >
                          Signup
                        </LinkItem>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
