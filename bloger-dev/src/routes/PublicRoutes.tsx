import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

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
