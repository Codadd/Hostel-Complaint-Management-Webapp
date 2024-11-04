import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Correct import

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); // State for user ID
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8093/auth/signup", {
      username,
      email,
      password,
      userId,
    })
      .then((response) => {
        if (response.data && response.data.status) {
          console.log("Signup successful:", response.data.message);
          navigate("/login");
        } else {
          console.error("Signup failed:", response.data.message);
          setPopupMessage("Signup failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Signup error:", error);
        if (error.response && error.response.status === 409) {
          setPopupMessage(
            "User ID already registered. Please use a different ID."
          );
        } else {
          setPopupMessage("Signup error. Please try again later.");
        }
      });
    const handleClosePopup = () => {
      setPopupMessage(""); // Close the popup
    };
  };
  return (
    <div className="container">
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          name="name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="User ID"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)} // Set user ID state
          required // Make user ID input required
        />
        <input
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          name="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="my-btn" type="submit">
          Sign Up
        </button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
      {popupMessage && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
