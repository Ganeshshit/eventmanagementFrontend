import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    backgroundColor: "#333",
    overflow: "hidden",
    padding: "1rem",
  };

  const linkStyle = {
    float: "left",
    color: "#f2f2f2",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
    fontSize: "17px",
  };

  const activeLinkStyle = {
    backgroundColor: "#04AA6D",
    color: "white",
  };

  const hoverStyle = {
    cursor: "pointer",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/about" style={{ ...linkStyle, ...hoverStyle }}>
        Register
      </Link>
      <Link to="/login" style={{ ...linkStyle, ...hoverStyle }}>
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
