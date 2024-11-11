<<<<<<< HEAD
// MainPage.js
//import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MainPage.css"; // Optional: Add any custom styles you need

=======
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MainPage.css"; // Optional: Add any custom styles you need
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8

const MainPage = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate("/signup"); // Redirect to the Signup page
  };

  const handleAdminLogin = () => {
    navigate("/adminlogin"); // Redirect to the Admin Login page
  };

  return (
    <div className="main-page">
      <h1>
        Welcome to{" "}
        <span className="highlight">Hostel Complaint Management System</span>
      </h1>
      {/* Box Container */}
      <div className="login-box">
        <h2>Please select your role to log in:</h2>
        <div className="role-buttons">
          <button onClick={handleUserLogin} className="btn btn-primary">
            Login as User
          </button>
          <button onClick={handleAdminLogin} className="btn btn-secondary">
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
