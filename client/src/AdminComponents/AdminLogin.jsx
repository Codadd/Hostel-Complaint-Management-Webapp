import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure your styling file exists

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
 
  const [hostel, setHostel] = useState(""); // New hostel field

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

      localStorage.setItem("hostel", hostel); // Store hostel in localStorage

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
        {/* Hostel Dropdown */}
        {/* <label htmlFor="hostel">Select Hostel:</label> */}
        <select
          id="hostel"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)} // Update state when a hostel is selected
        >
          <option value="">Select a hostel</option>
          <option value="KNGH">KNGH</option>
          <option value="DJGH">DJGH</option>
          <option value="PATEL">PATEL</option>
          <option value="NBH">NBH</option>
          <option value="SVH">SVH</option>
          <option value="MALVIYA">MALVIYA</option>
          <option value="TILAK">TILAK</option>
          <option value="TANDON">TANDON</option>
          <option value="IHB">IHB</option>
          <option value="SNGH">SNGH</option>
          <option value="TAGORE">TAGORE</option>
        </select>
        <button className="my-btn" type="submit">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AdminLogin;
