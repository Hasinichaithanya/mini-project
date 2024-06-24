import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Layout.css";

const Header = () => {
  // Check if the user is logged in by looking for a specific cookie
  const isLoggedIn = Cookies.get("userId");
  console.log(isLoggedIn);
  return (
    <header>
      <img src="./cheflogo.png" alt="logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/browse-chefs">Browse Chefs</Link>
        <Link to="/about-us">About Us</Link>

        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
      </nav>
    </header>
  );
};

export default Header;
