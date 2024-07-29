import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import FormPage from "./views/FormPage/FormPage";
import Login from "./views/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact-form" element={<FormPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
