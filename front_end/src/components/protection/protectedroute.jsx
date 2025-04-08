import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { authed } = useContext(AuthContext);
  return authed ? children : <Navigate to="/login" />;
};

export default RequireAuth;
