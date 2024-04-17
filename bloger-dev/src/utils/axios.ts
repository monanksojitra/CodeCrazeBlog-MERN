import axios from "axios";
import { toast } from "react-toastify";

// Function to get JWT token from local storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Axios instance with custom configuration
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
api.interceptors.response.use(
  (response) => {
    // You can customize the toast message based on the response status code
    toast.success(response.data.message);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toast.error("Unauthorized - invalid token");
    } else {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;
