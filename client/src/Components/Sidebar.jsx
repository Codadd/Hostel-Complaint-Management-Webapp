import React from "react";
import "../Styles/Sidebar.css";
import { motion } from "framer-motion";
import { SidebarData } from "../Data/SidebarData";
import RegisterComplaint from "../SideBarComponent.jsx/RegisterComplaint";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <motion.div
      className={`sidecomp ${isOpen ? "open" : "closed"}`}
      animate={{ width: isOpen ? 250 : 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <div className={`arrow ${isOpen ? "left" : "right"}`}></div>
        </button>
        <div className="logo">
          <h2>{isOpen ? "Hello" : ""}</h2>
        </div>
      </div>

      {isOpen && (
        <nav className="nav-menu">
          <ul>
            {SidebarData?.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
            {/* <li className="logout-btn">
              <button onClick={handleLogout}>Logout</button>
            </li> */}
          </ul>
        </nav>
      )}
    </motion.div>
  );
};

export default Sidebar;
