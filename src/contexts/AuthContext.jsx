import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState();

  const login = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const values = {
    isLoggedIn,
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
