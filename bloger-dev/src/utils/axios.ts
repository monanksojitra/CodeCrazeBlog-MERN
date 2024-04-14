import axios from "axios";
import { toast } from "react-toastify";
import navigate from "./navigator";

// Create Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Add request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Success handler
    toast.success(response.data.message);
    return response.data;
  },
  (error) => {
    // Error handler
    if (error.response) {
      // Server responded with an error status code
      const statusCode = error.response.status;
      console.log(statusCode);
      toast.error(`Error: ${error.response.data.message}`);
      if (statusCode === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("Request error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
