// axiosInstance.js
import axios from "axios";
import { toast } from "react-toastify";

// Use environment variable for base URL
const baseURL = "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL,
});

// Request interceptor for attaching JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Use React Context for token
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  ({ data: response }) => {
    // Success handler
    toast.success(response.message);
    return response.data;
  },
  (error) => {
    // Error handler
    if (error.response) {
      toast.error(`Error: ${error.response.data.message}`);
      // Use React Context to remove token
      localStorage.removeItem("token");
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
