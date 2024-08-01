/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { hasPermission, checkLoginStatus } from "../utils/auth";

// PrivateRoute: Redirects to login if not authenticated
const PrivateRoute = ({ element }) => {
  return checkLoginStatus() ? element : <Navigate to="/login" />;
};

// RoleBasedRoute: Checks both authentication and required roles
const RoleBasedRoute = ({ element, requiredRole }) => {
  return checkLoginStatus() ? (
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
