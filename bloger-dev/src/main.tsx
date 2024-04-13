// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Bloges from "./components/Bloges";
import ForgotPassword from "./components/ForgotPassword";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { ToastContainer } from "react-toastify";

// Separate Routes into a Dedicated Component
const MainRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<App />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blogs" element={<Bloges />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
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
