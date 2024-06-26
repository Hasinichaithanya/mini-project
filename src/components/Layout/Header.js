import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Layout.css";

const Header = () => {
  // Check if the user is logged in by looking for a specific cookie
  const isLoggedIn = Cookies.get("userId");
  const user = Cookies.get("user");

  console.log(isLoggedIn, user);
  return (
    <header>
      <img
        src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1719422571/chef_logo_wtmpko.png"
        alt="logo"
        className="logo"
      />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/browse-chefs">Browse Chefs</Link>
        <Link to="/about-us">About Us</Link>
        {!isLoggedIn && <Link to="/UserSignUp">Sign Up</Link>}
        {user === "chef" && <Link to="/dashboard">Dashboard</Link>}
        {user === "user" && <Link to="/orders">Orders</Link>}
        {user === "user" && <Link to="/user-profile">Profile</Link>}
      </nav>
    </header>
  );
};

export default Header;
