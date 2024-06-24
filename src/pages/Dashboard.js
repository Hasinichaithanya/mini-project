import React from "react";
import ProfileForm from "../components/Chef/ProfileForm";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Chef Dashboard</h2>
      <ProfileForm />
    </div>
  );
};

export default Dashboard;
