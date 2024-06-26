import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import UserSignUp from "./components/Auth/UserSignUp";
import Login from "./components/Auth/Login";

import Register from "./components/Auth/Register";
import BrowseChefs from "./components/Customer/BrowseChefs";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/Shared/PrivateRoute";
import "./App.css";
import Aboutus from "./components/AboutUs/Aboutus";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Orders from "./components/Orders/Orders";

const App = () => {
  const isAuthenticated = true; // Replace with your actual authentication logic

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse-chefs" element={<BrowseChefs />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/user-profile" element={<UserDashboard />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
