import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "https://eventbackend-7ny5.onrender.com/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response);
      localStorage.setItem("authToken", response.data.token);
      if (response.data.success === true) {
        setSuccess("Registration successful! Welcome.");
        setName("");
        setEmail("");
        setPassword("");

        const decodedToken = jwtDecode(response.data.token);
        if (decodedToken.userId == response.data.user._id) {
          navigate("/dashboard");
        }
      } else {
        setError(response.data.msg || "Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.msg ||
            "An error occurred. Please try again later."
        );
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  };

  const messageStyle = {
    textAlign: "center",
    color: error ? "red" : "green",
    margin: "10px 0",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      {error && <div style={messageStyle}>{error}</div>}
      {success && <div style={messageStyle}>{success}</div>}
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
        style={inputStyle}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        style={inputStyle}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Register
      </button>
      <label htmlFor="">Already have an acoount </label> <a href="/login">Login</a>
    </form>
  );
};

export default RegisterForm;
