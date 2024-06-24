import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivatePages = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const state = {
    message: isLoggedIn
      ? ""
      : "You are not logged in yet, please fill the following fields to continue",
  };

  if (!isLoggedIn) return <Navigate to="/access/login" state={state} />;

  return children;
};

export default PrivatePages;
