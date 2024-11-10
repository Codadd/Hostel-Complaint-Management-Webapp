import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Make sure this file exists

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [hostel, setHostel] = useState(""); // state for hostel
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if fields are empty and show a popup if necessary
    if (!userId || !password || !hostel) {
      alert("Please fill in all the fields (User ID, Password, Hostel).");
      return; // Prevent form submission if fields are empty
    }
    Axios.post("http://localhost:8093/auth/login", {
      userId,
      password,
      hostel,
    })
      .then((response) => {
        if (response.data && response.data.status) {
          // Store userId and hostel in localStorage upon successful login
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("hostel", response.data.hostel); // Store hostel information

          console.log(
            "User ID and Hostel saved to local storage:",
            response.data.userId,
            response.data.hostel
          );
          navigate("/"); // Redirect to home page after successful login
        } else {
          console.log("Login failed:", response.data.message);
        }
      })
      .catch((err) => {
        console.log("Error logging in:", err);
      });
  };

  return (
    <div className="container">
      <h2>Login!</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="User ID"
          name="userId"
          onChange={(e) => setUserId(e.target.value)} // Set user ID state
        />
        <input
          placeholder="Password"
          name="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)} // Set password state
        />
        <input
          placeholder="Hostel" // New field to take hostel input
          name="hostel"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)} // Set hostel state
        />
        <button className="my-btn" type="submit">
          Login
        </button>
        <Link to="/forgotPassword">Forgot Password</Link>
        <p>
          Don't Have an Account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
