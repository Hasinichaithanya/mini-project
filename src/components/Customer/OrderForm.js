import React, { useState } from "react";
import "./Customer.css";

const OrderForm = ({ chef }) => {
  const [order, setOrder] = useState({
    dish: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Order from {chef.name}</h3>
      <input
        type="text"
        name="dish"
        placeholder="Dish Name"
        value={order.dish}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={order.quantity}
        onChange={handleChange}
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
