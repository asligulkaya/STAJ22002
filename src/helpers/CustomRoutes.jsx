/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { isAuthenticated, hasPermission } from "../utils/auth";

// PrivateRoute: Redirects to login if not authenticated
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// RoleBasedRoute: Checks both authentication and required roles
const RoleBasedRoute = ({ element, requiredRole }) => {
  return isAuthenticated() ? (
    hasPermission(requiredRole) ? (
      element
    ) : (
      <Navigate to="/not-authorized" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export { PrivateRoute, RoleBasedRoute };
