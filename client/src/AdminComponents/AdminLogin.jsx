import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure your styling file exists

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Predefined admin credentials
  const predefinedAdminCredentials = {
    adminId: "admin",
    password: "admin@123",
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Check if entered credentials match predefined ones
    if (
      adminId === predefinedAdminCredentials.adminId &&
      password === predefinedAdminCredentials.password
    ) {
      localStorage.setItem("adminId", adminId); // Optionally store admin ID
      setError(""); // Clear any previous error
      console.log("Admin login successful"); // Success message
      navigate("/admindashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid Admin ID or Password"); // Display error message
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="my-btn" type="submit">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AdminLogin;
