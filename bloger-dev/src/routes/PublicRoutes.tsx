import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";

const PublicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "dashboard",
      //   element: <Dashboard />,
      // },
      // {
      //   path: "about",
      //   element: <About />,
      // },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default PublicRoutes;
