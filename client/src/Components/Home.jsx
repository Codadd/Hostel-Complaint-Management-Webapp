import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/HomeContent.css";
import React, { useState } from "react";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-container">
      {/* Pass isOpen state and toggle function to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <div className="ripple-background">
          <div className="circle xxlarge shade1"></div>
          <div className="circle xlarge shade2"></div>
          <div className="circle large shade3"></div>
          <div className="circle medium shade4"></div>
          <div className="circle small shade5"></div>
        </div>
        <header className="header">
          <h1 className="home-heading">
            Welcome to the Hostel Complaint Management System!
          </h1>
          <h2 className="second-heading">
            Your comfort and satisfaction are our priorities.
          </h2>
          <div className="para">
            <p>
              Every concern matters: Together, we create a better living
              environment.
            </p>
            <p>
              Submit, Track, and Resolve: A seamless process for all complaints.
            </p>
            <p>Speak up! Your feedback drives our improvement.</p>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Home;
