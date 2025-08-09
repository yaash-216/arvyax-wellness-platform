import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
