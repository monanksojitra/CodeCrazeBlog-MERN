// axiosInstance.js
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

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
      toast.error(`Error: ${error.response.data.message}`);
      if (statusCode === 401) {
        // Use React Context to remove token
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
