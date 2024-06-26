import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UserSignUp = () => {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
    location: "Nizamabad",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required.";
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
    console.log("clikc");
    const object = {
      name: user.name,
      email: user.mail,
      location: user.location,
      password: user.password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    };

    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/user-signup",
        options
      );
      const result = await response.json();
      console.log(result);
      if (result.message) {
        Cookies.set("userId", JSON.stringify(result.id), {
          expires: 10,
        });
        Cookies.set("user", result.user, {
          expires: 10,
        });
        navigate("/");
      } else {
        console.error("Sign Up failed:", result);
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
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={user.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="mail"
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
        <select
          name="location"
          value={user.location}
          onChange={handleChange}
          className="location"
        >
          <option>Nizamabad</option>
          <option>Banjara Hills</option>
          <option>Jubilee Hills</option>
          <option>Charminar</option>
          <option>Secunderabad</option>
          <option>Karimnagar</option>
          <option>Warangal</option>
          <option>Khammam</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>{" "}
      <br />
      <Link to="/register">Register as Chef?</Link>
      <br />
      <br />
      <Link to="/login">Already have an account? Login!</Link>
    </div>
  );
};

export default UserSignUp;
