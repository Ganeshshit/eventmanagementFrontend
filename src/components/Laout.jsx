// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import "../App.css";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div>
      {/* Common layout elements */}
      <header>
        <Navbar />
      </header>

      {/* Content of each page */}
      <main>{children}</main>

      <footer>
        <p>© 2024 My App</p>
      </footer>
    </div>
  );
};

export default Layout;
