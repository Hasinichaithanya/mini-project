import React, { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";
import Cookies from "js-cookie";
import "./Chef.css";
import Orders from "./../Orders/Orders";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    cost: "",
    image: "",
    location: "",
    Experience: "",
    Description: "",
    password: "",
    likes: 0,
    comments: [],
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
        "https://mini-project-backend-i3zm.onrender.com/get-chef?id=" +
        id.slice(1, -1);
      console.log(url);
      try {
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data.chefDetails || {});
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

  const handleImageUpload = ({ base64 }) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      image: base64,
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
            Authorization: `Bearer ${Cookies.get("token")}`,
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
        <h2>Update Profile</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <label>E-Mail:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <label>Cost per meal:</label>
          <input
            type="number"
            name="cost"
            placeholder="Cost per Meal"
            value={profile.cost}
            onChange={handleChange}
          />
        </div>
        <img src={profile.image} alt="chef" />
        <FileBase64 multiple={false} onDone={handleImageUpload} />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={profile.Location}
          onChange={handleChange}
        />
        <div>
          {" "}
          <label>Experience:</label>
          <input
            type="number"
            name="Experience"
            placeholder="Years of Experience"
            value={profile.Experience}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Food Items:</label>

          <input
            type="text"
            name="Experience"
            placeholder="Your food items"
            value={profile.Fooditems}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description: </label>

          <textarea
            name="Description"
            placeholder="Description"
            value={profile.Description}
            onChange={handleChange}
          />
        </div>
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

      <div className="profile-details">
        <h2>Profile Details</h2>
        <p>
          <strong>Likes:</strong> {!profile.likes == 0 ? profile.likes : "0"}
        </p>
        <h3>Comments:</h3>
        {!profile.comments == [] ? (
          <ul>
            {profile.comments.length > 0 &&
              profile.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
          </ul>
        ) : (
          <li>No comments available</li>
        )}{" "}
        <h3>Orders: </h3>
        {!profile.orders == [] ? (
          <ul>
            {profile.orders.length > 0 &&
              profile.orders.map((order, index) => (
                <li key={index}>
                  Date: {order.date}
                  <br />
                  Time: {order.time}
                  <br />
                  Selected Items:
                  <ul>
                    {order.selectedItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        ) : (
          <li>No Orders available</li>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
