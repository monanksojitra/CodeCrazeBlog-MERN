import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";

// Define the shape of the account object
interface Account {
  firstname: string;
  lastname: string;
  address: string;
  country: string;
  postalcode: number;
  city: string;
  bio: string;
  username: string;
  email: string;
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
  deletePost: (postId: string) => void;
  updateBlog: (formData: any, postId: string) => void;
  deleteProfile: () => void;
  updateProfile: (formData: any) => void;
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
  const [posts, setPosts] = useState<object[]>([]);

  const register = async (formData: any): Promise<boolean> => {
    try {
      const {
        data: { token, data: accountData },
      } = await axios.post("/auth/register", formData);
      setAccount(accountData);
      setToken(token);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
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
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
  };

  const updateProfile = (formData: any) => {
    axios
      .put("/auth/profile", formData)
      .then((response) => {
        setAccount(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };

  const deleteProfile = () => {
    axios
      .delete("/auth/profile")
      .then(() => {
        logout();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };

  const getAllPost = () => {
    if (!token || !isLoggedIn) {
      return null;
    }
    axios
      .get("/post")
      .then(({ data: { posts } }) => {
        setPosts(posts);
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
      .then(() => {
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
      .then(() => {
        getAllPost();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };

  const deletePost = (postId: string) => {
    axios
      .delete(`/post/${postId}`)
      .then(() => {
        getAllPost();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };

  useEffect(() => {
    if (token && account) {
      localStorage.setItem("token", token);
      localStorage.setItem("account", JSON.stringify(account));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("account");
    }
  }, [token, account]);

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
    } catch (error: any) {
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
        deleteProfile,
        updateProfile,
        posts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
