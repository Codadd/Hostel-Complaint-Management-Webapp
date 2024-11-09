import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../Styles/AdminDashboard.css";

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
      const response = await Axios.get(
        "http://localhost:8093/admincomplaint/all",
        {
          params: { status: statusFilter, category: categoryFilter },
        }
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Function to update complaint status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await Axios.put(`http://localhost:8093/admincomplaint/update/${id}`, {
        status: newStatus,
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <label>Category Filter:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Water">Water</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Noise">Noise</option>
          <option value="Electricity">Electricity</option>
          <option value="Other">Other</option>
        </select>
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
              <th>Actions</th>
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
                  <td>
                    <select
                      value={complaint.status}
                      onChange={(e) =>
                        handleUpdateStatus(complaint._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    {/* <button
                      onClick={() =>
                        handleUpdateStatus(complaint._id, "Resolved")
                      }
                    >
                      Mark as Resolved
                    </button> */}
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
    </div>
  );
};

export default AdminDashboard;
