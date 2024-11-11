import { Link, useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";
import { motion } from "framer-motion";
import { SidebarData } from "../Data/SidebarData";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
<<<<<<< HEAD

    localStorage.removeItem("hostel");//hostel

=======
    localStorage.removeItem("hostel");
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
    navigate("/mainpage");
  };

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
          <h2>{isOpen ? "Hello User" : ""}</h2>
        </div>
      </div>

      {isOpen && (
        <nav className="nav-menu">
          <ul>
            {SidebarData.map((item, index) => (
              <li key={index}>
                {item.isLogout ? (
                  <button onClick={handleLogout} className="logout-btn">
                    {item.icon}
                    {item.title}
                  </button>
                ) : (
                  <Link to={item.path}>
                    {item.icon}
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </motion.div>
  );
};

export default Sidebar;
