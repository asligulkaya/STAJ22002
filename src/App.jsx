/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute, RoleBasedRoute } from "./helpers/CustomRoutes";

import FormPage from "./views/FormPage/FormPage";
import Login from "./views/Login/Login";
import NotAuthorized from "./views/Error/NotAuthorized/NotAuthorized";
import NotFound from "./views/Error/NotFound/NotFound";
import Messages from "./views/Messages/Messages";
import MessagesDetail from "./views/Messages/MessagesDetail";
import Users from "./views/Users/Users";
import UsersDetail from "./views/Users/UsersDetail";
import AddUser from "./views/Users/AddUser";
import Reports from "./views/Reports/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FormPage />} />
        {/* Private Routes */}
        <Route
          path="/messages"
          element={<PrivateRoute element={<Messages />} />}
        />
        <Route
          path="/messages/:id"
          element={<PrivateRoute element={<MessagesDetail />} />}
        />
        {/* Role-Based Routes */}
        <Route
          path="/users"
          element={<RoleBasedRoute element={<Users />} requiredRole="admin" />}
        />
        <Route
          path="/user/:id"
          element={
            <RoleBasedRoute element={<UsersDetail />} requiredRole="admin" />
          }
        />
        <Route
          path="/add-user"
          element={
            <RoleBasedRoute element={<AddUser />} requiredRole="admin" />
          }
        />
        <Route
          path="/reports"
          element={
            <RoleBasedRoute element={<Reports />} requiredRole="admin" />
          }
        />
        {/* Authorization and Not Found Routes */}
        <Route path="*" element={<NotFound />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
