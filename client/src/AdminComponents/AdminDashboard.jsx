import { useEffect, useState } from "react";
import Axios from "axios";
import "../Styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  // Fetch complaints when the component is loaded
  useEffect(() => {
    fetchComplaints();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, categoryFilter]);

  // Fetch complaints based on filters
  const fetchComplaints = async () => {
    try {
      const response = await Axios.get("http://localhost:8093/complaints/all", {
        params: { status: statusFilter, category: categoryFilter },
      });
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Update complaint status and response
  const handleUpdateStatus = async (id, newStatus, responseText) => {
    try {
      const result = await Axios.put(
        `http://localhost:8093/complaints/update/${id}`,
        { status: newStatus, adminResponse: responseText }
      );
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id
            ? { ...complaint, status: newStatus, adminResponse: responseText }
            : complaint
        )
      );
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  //Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminId");// Use "adminId" instead of "adminToken"
    sessionStorage.removeItem("adminId");// Also clear from session storage, if used
    navigate("/");// Redirect to main page
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Complaints Management</h1>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Filters Section */}
      <div className="filters">
        <label>Status Filter:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <label>Category Filter:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="maintenance">Maintenance</option>
          <option value="cleaning">Cleaning</option>
          <option value="other">Other</option>
          <option value="water">Water</option>
          <option value="noise">Noise</option>
          <option value="electricity">Electricity</option>
        </select>

        <button className="apply-filter-btn">
          Apply Filters
        </button>
      </div>

      {/* Complaints Table */}
      <div className="table-container">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Description</th>
              <th>Issue Type</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Response</th>
              <th>Actions</th>
              <th>Feedback</th>{/*New column for feedback*/}
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.userId}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.issueType}</td>
                  <td>
                    {new Date(complaint.createdAt).toLocaleDateString("en-US")}
                  </td>
                  <td>{complaint.status}</td>
                  <td>{complaint.adminResponse || "No response"}</td>
                  <td>
                    <select
                      value={complaint.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          complaint._id,
                          e.target.value,
                          "Status updated by admin"
                        )
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          complaint._id,
                          "resolved",
                          "Resolved by admin"
                        )
                      }
                    >
                      Mark as Resolved
                    </button>
                  </td>
                   {/* Display feedback for resolved complaints*/}
                   <td>
                    {complaint.status === "resolved"
                      ? complaint.feedback || "No feedback provided" : "N/A"}
                   </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No complaints found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
