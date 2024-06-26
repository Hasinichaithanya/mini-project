import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import BookingModal from "../Booking/Booking";

import Modal from "react-modal";
import "./Chef.css";

Modal.setAppElement("#root"); // Ensure this line is present

const ChefProfile = ({ chef = {} }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(chef.comments || []);
  const [likes, setLikes] = useState(chef.likes || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChefId, setSelectedChefId] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const openBookingModal = (chefId) => {
    setSelectedChefId(chefId);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    const updatedComments = [...comments, newComment];

    try {
      const response = await fetch(
        `https://mini-project-backend-i3zm.onrender.com/update-comments/${chef._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: updatedComments }),
        }
      );

      if (response.ok) {
        setComments(updatedComments);
        setNewComment("");
      } else {
        console.error("Failed to update comments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://mini-project-backend-i3zm.onrender.com/update-likes/${chef._id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setLikes(likes + 1);
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chef-profile">
      <img src={chef.image || ""} alt={chef.name || "Chef"} />
      <h3>{chef.name || "Unknown Chef"}</h3> <hr />
      <p>
        <b>Specialities:</b>
        {chef.Fooditems.map((item) => (
          <li className="list-item" key={uuidv4()}>
            {item},
          </li>
        )) || "Specialties not available"}
      </p>
      <hr />
      <p>
        <strong>
          <i>Exp: </i>
        </strong>
        {chef.Experience || 0} years
      </p>{" "}
      <hr />
      <p>
        <b>
          <i>Cost: </i>
        </b>
        {chef.cost || "Cost not available"} per meal
      </p>{" "}
      <hr />
      <div className="btns-container">
        <button onClick={handleLike}>
          {likes} <AiOutlineLike />
        </button>
        <br />
        <button onClick={openModal} className="more-btn">
          More
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chef Details"
      >
        <h2>{chef.name || "Unknown Chef"}</h2>
        <img
          src={chef.image || ""}
          alt={chef.name || "Chef"}
          className="modal-image"
        />
        <p>
          <strong>Location:</strong> {chef.Location || "Location not available"}
        </p>
        <p>
          <strong>Experience:</strong> {chef.Experience || 0} years
        </p>
        <p>
          <strong>Mail: </strong>
          {chef.email}
        </p>
        <p>
          <strong>Specialties:</strong>{" "}
          {chef.Fooditems
            ? chef.Fooditems.join(", ")
            : "Specialties not available"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {chef.Description || "Description not available"}
        </p>
        <p>
          <strong>Comments:</strong>
        </p>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment, index) => <li key={index}>{comment}</li>)
          ) : (
            <li>No comments available</li>
          )}
        </ul>
        <form className="form-modal" onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add your comment"
          />
          <button type="submit" className="modal-btn">
            Comment
          </button>
        </form>
        <button
          className="modal-btn"
          onClick={() => openBookingModal(chef._id)}
        >
          Book Chef
        </button>
        <BookingModal
          isOpen={isModalOpen}
          closeModal={closeBookingModal}
          chefId={selectedChefId}
          items={chef.Fooditems}
        />
        <button onClick={closeModal} className="modal-btn">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ChefProfile;
