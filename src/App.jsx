/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { PrivateRoute, RoleBasedRoute } from "./CustomRoutes";
import FormPage from "./views/FormPage/FormPage";
import Login from "./views/Login/Login";
import NotAuthorized from "./views/NotAuthorized/NotAuthorized";
import NotFound from "./views/NotFound/NotFound";
import Home from "./views/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Private Route */}
        <Route
          path="/contact-form"
          element={<PrivateRoute element={<FormPage />} />}
        />
        {/* Role-Based Route */}
        <Route
          path="/admin"
          element={<RoleBasedRoute element={<Login />} requiredRole="admin" />} // This element should be changed
        />
        {/* Authorization and Not Found Routes */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
