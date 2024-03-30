import React from "react"; // Ensure React is imported for JSX
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Initial render: Render the App component to the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
