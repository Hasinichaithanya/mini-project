import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const validateForm = () => {
    const newErrors = {};
    if (!user.mail) {
      newErrors.mail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.mail)) {
      newErrors.mail = "Email address is invalid.";
    }
    if (!user.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const object = {
      email: user.mail,
      password: user.password,
    };
    console.log(object);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    };

    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/login",
        options
      );
      const result = await response.json();
      if (result.Message) {
        Cookies.set("userId", JSON.stringify(result.userId), {
          expires: 10,
        });
        Cookies.set("user", result.user, {
          expires: 10,
        });
        navigate("/");
      } else {
        console.error("Login failed:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="mail"
          placeholder="Email"
          value={user.mail}
          onChange={handleChange}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />{" "}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
