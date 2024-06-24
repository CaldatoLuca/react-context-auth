import React, { useState, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    const from = location.state?.from?.pathname || "/";
    navigate(from);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
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
