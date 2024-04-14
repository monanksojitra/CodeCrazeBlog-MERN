import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";

// Define types
type Account = {
  // Define account properties here
};

type AuthContextType = {
  isLoggedIn: boolean;
  account: Account | null;
  token: string | null;
  register: (formData: any) => Promise<boolean>;
  login: (formData: any) => Promise<boolean>;
  logout: () => void;
  getAllPosts: () => Promise<any>;
  addNewPost: (formData: any) => Promise<boolean>;
  posts: any;
};

// Initialize context
const AuthContext = createContext<AuthContextType | null>(null);

// Define props type for AuthProvider component
type AuthProviderProps = {
  children: ReactNode;
};

// Export the provider (handle all the logic here)
export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [posts, setPosts] = useState([]);
  const [account, setAccount] = useState<Account | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );

  const register = (formData: any = {}): Promise<boolean> =>
    new Promise((resolve, reject) => {
      axios
        .post("/auth/register", formData)
        .then(({ data: { data: accountData, token: accessToken } }) => {
          setAccount(accountData);
          setToken(accessToken);
          setIsLoggedIn(true);
          resolve(true);
        })
        .catch((error) => {
          console.error(error);
          reject(error?.response?.data?.message || error.message);
        });
    });

  const login = (formData: any): Promise<void> =>
    new Promise((resolve, reject) => {
      axios
        .post("/auth/login", formData)
        .then(({ data: accountData, token: accessToken }) => {
          setAccount(accountData);
          setToken(accessToken);
          setIsLoggedIn(true);
          resolve(true);
        })
        .catch((error) => {
          console.error(error);
          reject(error?.response?.data?.message || error.message);
        });
    });

  const logout = (): void => {
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const loginWithToken = async (): Promise<void> => {
    try {
      const {
        data: { data: accountData, token: accessToken },
      } = await axios.post("/auth/login", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAccount(accountData);
      setToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      if (error?.response?.statusCode === 401) setToken(null);
    }
  };

  const getAllPosts = async (): Promise<any> => {
    try {
      const data = await axios.get("/post");
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewPost = (formData: any = {}): Promise<boolean> =>
    new Promise((resolve, reject) => {
      axios
        .post("/post/add", formData)
        .then(({ message }) => {
          resolve(true);
          toast.success(message);
          return true;
        })
        .catch((error) => {
          console.error(error);
          reject(error?.response?.data?.message || error.message);
          return false;
        });
    });

  // This side effect keeps local storage updated with recent token value,
  // making sure it can be re-used upon refresh or re-open browser
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // This side effect runs only if we have a token, but no account or logged-in boolean.
  // This "if" statement is "true" only when refreshed, or re-opened the browser,
  // if true, it will then ask the backend for the account information (and will get them if the token hasn't expired)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        account,
        token,
        register,
        login,
        logout,
        getAllPosts,
        addNewPost,
        posts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
