// src/admincomponents/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import Axios from "axios";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch complaints on component load or when filters change
  useEffect(() => {
    fetchComplaints();
  }, [statusFilter, categoryFilter]);

  // Function to fetch complaints based on filters
  const fetchComplaints = async () => {
    try {
      const response = await Axios.get("http://localhost:8093/admin/complaints", {
        params: { status: statusFilter, category: categoryFilter },
      });
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Function to update complaint status and response
  const handleUpdateStatus = async (id, newStatus, responseText) => {
    try {
      await Axios.put(`http://localhost:8093/admin/complaints/${id}`, {
        status: newStatus,
        response: responseText,
      });
      fetchComplaints(); // Refresh complaints list after update
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Complaints Management</h1>

      {/* Filters Section */}
      <div className="filters">
        <label>Status Filter:</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <label>Category Filter:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Food">Food</option>
          <option value="Cleanliness">Cleanliness</option>
          {/* Add other categories as needed */}
        </select>
        <button onClick={fetchComplaints}>Apply Filters</button>
      </div>

      {/* Complaints Table */}
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{complaint.userId}</td>
                <td>{complaint.status}</td>
                <td>
                  {/* Dropdown to update status */}
                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      handleUpdateStatus(complaint._id, e.target.value, "Status updated by admin")
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  {/* Button to mark as resolved */}
                  <button
                    onClick={() => handleUpdateStatus(complaint._id, "Resolved", "Resolved by admin")}
                  >
                    Mark as Resolved
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No complaints found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
