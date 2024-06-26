import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserDashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  useEffect(() => {
    const id = Cookies.get("userId");
    console.log(id);

    const fetchProfile = async () => {
      if (!id) {
        console.error("User ID is invalid or not found in cookies");
        return;
      }
      const url =
        "https://mini-project-backend-i3zm.onrender.com/get-user?id=" +
        id.slice(1, -1);
      console.log(url);
      try {
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log(data);
        setProfile(data.userDetails || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/chef-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: profile.password }),
        }
      );

      if (response.ok) {
        console.log("Password updated successfully");
      } else {
        console.error("Error updating password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Your Profile</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="location"
          value={profile.location}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>

      <div className="password-update-container">
        <form onSubmit={handlePasswordChange}>
          <h2>Change Password</h2>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={profile.password}
            onChange={handleChange}
          />
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
