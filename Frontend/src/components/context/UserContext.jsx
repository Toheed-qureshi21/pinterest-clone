import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  

  const authUser = async (endpoint, userData) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`/api/user/${endpoint}`, userData);
      toast.success(data?.message);
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const loginUser = async (email, password,fetchPins) => {
    await authUser("login", { email, password });
    fetchPins();
  
  };

  const registerUser = async (username, email, password,fetchPins) => {
    await authUser("register", { username, email, password });
    fetchPins()
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
        const { data } = await axios.get("/api/user/me");
        setUser(data);
        setIsAuth(true);  
    } catch (error) {
        setIsAuth(false);  
        setUser(null);
        toast.error(error.response?.data?.message || "Failed to fetch user");
    } finally {
        setLoading(false);
    }
}

  // follow
  const followUser = async(id,fetchUsers) => {
    try {
        const {data} = await axios.post(`/api/user/follow/${id}`);
        toast.success(data?.message);
        fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    }
  }
  

  useEffect(() => {
    if (isAuth) {
      fetchUser();
  }
  }, []);

  return (
    <UserContext.Provider value={{ loginUser, btnLoading, isAuth, user, loading, registerUser,setIsAuth,setUser ,followUser,fetchUser}}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};
