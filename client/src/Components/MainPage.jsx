// MainPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
//import "./MainPage.css"; // Optional: Add any custom styles you need

const MainPage = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate("/signup"); // Redirect to the Signup page
  };

  const handleAdminLogin = () => {
    navigate("/adminlogin"); // You can set this to any route you need for admin login
  };

  return (
    <div className="main-page">
      <h1>Welcome! Please select your role to log in:</h1>
      <div className="role-buttons">
        <button onClick={handleUserLogin} className="btn btn-primary">
          Login as User
        </button>
        <button onClick={handleAdminLogin} className="btn btn-secondary">
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default MainPage;

