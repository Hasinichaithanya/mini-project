// BookingModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./Booking.css";

const BookingModal = ({ isOpen, closeModal, chefId, items }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("user");
    if (!userId) {
      console.error("Login to book the chef");
      navigate("/UserSignUp");
    }
    try {
      bookChef();
      closeModal();
    } catch (error) {
      console.error("Error booking chef:", error);
      // Handle error (show message, etc.)
    }
  };

  const bookChef = async () => {
    try {
      const id = Cookies.get("userId");
      const userId = id.slice(1, -1);
      console.log(userId);
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/send-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chefId, userId, date, time, selectedItems }),
        }
      );
      console.log(response);

      // Refresh chefs after booking
    } catch (error) {
      console.error("Error booking chef:", error);
      // Handle error (show message, retry, etc.)
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal">
      <h2>Book Chef</h2>
      <form onSubmit={handleBooking} className="form">
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Items:</label>
          {items.map((item, index) => (
            <div key={index} className="checkbox-group">
              <input
                type="checkbox"
                id={item}
                value={item}
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="checkbox"
              />
              <label htmlFor={item} className="checkbox-label">
                {item}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="button">
          Book Chef
        </button>
      </form>
      <button onClick={closeModal} className="button">
        Cancel
      </button>
    </Modal>
  );
};

export default BookingModal;
