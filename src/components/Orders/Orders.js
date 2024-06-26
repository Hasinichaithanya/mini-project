import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

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
        console.log(data.userDetails.orders);
        setOrders(data.userDetails.orders || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const renderOrder = (orders) => {
    return (
      <>
        {orders.map((order) => {
          return (
            <div className="order-item">
              <div className="image-container">
                {" "}
                <img
                  src={order.image}
                  alt="order-image"
                  className="order-image"
                />
                <i>{order.chefName}</i>
              </div>
              <div>
                {" "}
                <p>Order: Rs. {order.cost}</p>
                <p>Time: {order.time}</p>
                <p>Date: {order.date}</p>
              </div>{" "}
              <div>
                <p>Ordered Items:</p>
                <ul>
                  {order.selectedItems.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="profile-form-container">
      {orders.length > 0 ? renderOrder(orders) : "No orders"}
    </div>
  );
};

export default Orders;
