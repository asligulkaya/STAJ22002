/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { PrivateRoute, RoleBasedRoute } from "./helpers/CustomRoutes";
import FormPage from "./views/FormPage/FormPage";
import Login from "./views/Login/Login";
import NotAuthorized from "./views/Error/NotAuthorized/NotAuthorized";
import NotFound from "./views/Error/NotFound/NotFound";
import Home from "./views/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Private Route */}
        <Route
          path="/contact-form"
          element={<PrivateRoute element={<FormPage />} />}
        />
        {/* Role-Based Route */}
        <Route
          path="/admin"
          element={<RoleBasedRoute element={<Header />} requiredRole="admin" />} // This element should be changed
        />
        {/* Authorization and Not Found Routes */}
        <Route path="*" element={<NotFound />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
