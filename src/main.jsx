// client/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
// import Update from "./Update.jsx";
import "./App.css";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<App />} />
        {/* <Route path="/update/:id" element={<Update />} /> */}
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
