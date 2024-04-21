// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import About from "./components/About";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Blogs from "./components/blog/Blogs";
import Profile from "./components/profile/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

// Separate Routes into a Dedicated Component
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/*" element={<NotFound />} />
      {/* <Route path="/test" element={<Test />} /> */}
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer
      autoClose={700}
      hideProgressBar
      newestOnTop
      pauseOnFocusLoss={false}
      pauseOnHover={false}
    />
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </>
);
