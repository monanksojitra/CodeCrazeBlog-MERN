import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

// Define the shape of the account object
interface Account {
  // Define account properties here
}

// Define the shape of the context
interface AuthContextValue {
  isLoggedIn: boolean;
  account: Account | null;
  token: string | null;
  register: (formData: any) => Promise<boolean>;
  login: (formData: any) => Promise<boolean>;
  logout: () => void;
  addNewPost: (formData: any) => void;
  getAllPost: () => void;
  posts: object[];
  deletePost: (postid: string) => void;
  updateBlog: (formData: any, postId: string) => void;
}

// Define the shape of the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}
// Create the context
const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [posts, setPosts] = useState([]);
  const register = async (formData: any): Promise<boolean> => {
    try {
      const {
        data: { data: accountData, token: accessToken },
      } = await axios.post("/auth/register", formData);
      setAccount(accountData);
      setToken(accessToken);
      setIsLoggedIn(true);
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error?.response?.data?.message || error.message);
    }
  };

  const login = async (formData: any): Promise<boolean> => {
    try {
      const {
        data: { data: accountData, token: accessToken },
      } = await axios.post("/auth/login", formData);
      setAccount(accountData);
      setToken(accessToken);
      setIsLoggedIn(true);
      toast.success("Login successful");
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error?.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
    toast.success("Logout successful");
  };
  const getAllPost = () => {
    axios
      .get("/post")
      .then(({ data: { posts } }) => {
        setPosts(posts);
        toast.success("Blog fetched successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };
  const addNewPost = (formData: any) => {
    axios
      .post("/post/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Blog created successfully");
        getAllPost();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };

  const updateBlog = (formData: any, postId: string) => {
    axios
      .put(`/post/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Blog updated successfully");
        getAllPost();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };
  const deletePost = (postid: string) => {
    axios
      .delete(`/post/${postid}`)
      .then((response) => {
        toast.success("Blog deleted successfully");
        getAllPost();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Additional logic for handling token-based login on app load
  useEffect(() => {
    if (token && (!isLoggedIn || !account)) {
      loginWithToken();
    }
  }, [token, isLoggedIn, account]);

  const loginWithToken = async () => {
    try {
      const {
        data: { data: accountData, token: accessToken },
      } = await axios.get("/auth/login", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setAccount(accountData);
      setToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401) setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        account,
        token,
        register,
        login,
        logout,
        addNewPost,
        getAllPost,
        deletePost,
        updateBlog,
        posts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
