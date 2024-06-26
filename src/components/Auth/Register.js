import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Auth.css";

const ProfileForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [profile, setProfile] = useState({
    name: "",
    specialties: "",
    experience: "",
    pricePerMeal: "",
    photo: "",
    mail: "",
    password: "",
    fooditems: "",
    location: "Nizamabad",
  });
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = "Name is required.";
    if (!profile.mail) {
      newErrors.mail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(profile.mail)) {
      newErrors.mail = "Email address is invalid.";
    }
    if (!profile.password) newErrors.password = "Password is required.";
    if (!profile.experience || isNaN(profile.experience))
      newErrors.experience = "Experience must be a number.";
    if (!profile.pricePerMeal || isNaN(profile.pricePerMeal))
      newErrors.pricePerMeal = "Price per meal must be a number.";
    if (!profile.fooditems) newErrors.fooditems = "Food items are required.";
    if (!image.image) newErrors.image = "Image is required.";
    if (!profile.specialties)
      newErrors.specialties = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const object = {
      name: profile.name,
      email: profile.mail,
      cost: profile.pricePerMeal,
      image: image.image,
      Location: profile.location,
      Experience: profile.experience,
      Fooditems: profile.fooditems.split(","),
      Description: profile.specialties,
      Password: profile.password,
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
        "https://mini-project-backend-i3zm.onrender.com/register",
        options
      );
      const result = await response.json();
      console.log(result.userDetails.insertedId);
      if (response.ok) {
        // Set cookies for 10 days
        Cookies.set("userId", JSON.stringify(result.userDetails.insertedId), {
          expires: 10,
        });
        Cookies.set("user", "Chef", {
          expires: 10,
        });
        // Navigate to home page programmatically using useNavigate
        navigate("/");
      } else {
        console.error("Registration failed:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Register as a chef</h1>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={profile.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">*{errors.name}</p>}
      <br />
      <input
        type="mail"
        name="mail"
        placeholder="Enter your e-mail"
        value={profile.mail}
        onChange={handleChange}
      />
      {errors.mail && <p className="error">*{errors.mail}</p>}
      <br />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={profile.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error">*{errors.password}</p>}
      <br />
      <input
        type="number"
        name="experience"
        placeholder="Years of Experience"
        value={profile.experience}
        onChange={handleChange}
      />
      {errors.experience && <p className="error">*{errors.experience}</p>}
      <br />
      <input
        type="number"
        name="pricePerMeal"
        placeholder="Price per meal"
        value={profile.pricePerMeal}
        onChange={handleChange}
      />
      {errors.pricePerMeal && <p className="error">*{errors.pricePerMeal}</p>}
      <br />
      <select name="location" value={profile.location} onChange={handleChange}>
        <option>Nizamabad</option>
        <option>Banjara Hills</option>
        <option>Jubilee Hills</option>
        <option>Charminar</option>
        <option>Secunderabad</option>
        <option>Karimnagar</option>
        <option>Warangal</option>
        <option>Khammam</option>
      </select>
      <br />
      <input
        type="text"
        name="fooditems"
        placeholder="Enter food items separated by commas"
        value={profile.fooditems}
        onChange={handleChange}
      />
      {errors.fooditems && <p className="error">*{errors.fooditems}</p>}
      <br />
      <div>
        <label>Upload your image</label>{" "}
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImage({ image: base64 })}
        />
      </div>
      {errors.image && <p className="error">*{errors.image}</p>}
      <br />
      <textarea
        name="specialties"
        placeholder="Describe yourself"
        value={profile.specialties}
        onChange={handleChange}
      />
      {errors.specialties && <p className="error">*{errors.specialties}</p>}
      <br />
      <button className="submit" type="submit">
        Register
      </button>
    </form>
  );
};

export default ProfileForm;
