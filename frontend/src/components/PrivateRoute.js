import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ element, requiredRoles = [] }) => {
  const { authenticated, user } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) =>
      user.roles.includes(role)
    );

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return element;
};

export default PrivateRoute;
