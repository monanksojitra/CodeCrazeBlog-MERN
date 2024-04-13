import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Add a request interceptor to attach JWT token to every request
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

// Add a response interceptor to standardize error messages
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    console.log(response);
    toast.success("Success: Operation successful");
    return response.data; // Return only the data from the response
  },
  (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      toast.error(`Error: ${error.response.data.message}`);
      let errorMessage = "";
      switch (statusCode) {
        case 400:
          errorMessage =
            "Bad Request: The request cannot be fulfilled due to bad syntax.";
          break;
        case 401:
          errorMessage =
            "Unauthorized: The request requires user authentication.";
          break;
        case 403:
          errorMessage =
            "Forbidden: The server understood the request but refuses to authorize it.";
          break;
        case 404:
          errorMessage =
            "Not Found: The requested resource could not be found.";
          break;
        case 500:
          errorMessage =
            "Internal Server Error: The server encountered an unexpected condition.";
          break;
        default:
          errorMessage = `Error: ${statusCode}`;
          break;
      }
      console.error(errorMessage);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
