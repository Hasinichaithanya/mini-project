import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Modal from "react-modal";
import reportWebVitals from "./reportWebVitals";

// Set the app element for react-modal
Modal.setAppElement("#root");

// Get the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals
reportWebVitals();
