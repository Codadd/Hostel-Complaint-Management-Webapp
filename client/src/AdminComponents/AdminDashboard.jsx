/* import React, { useEffect, useState } from "react";
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

  // Function to update complaint status and response
  const handleUpdateStatus = async (id, newStatus, responseText) => {
    try {
      // Ensure to pass the correct variable names for status and response
      const result = await Axios.put(
        `http://localhost:8093/admincomplaint/update/${id}`,
        {
          status: newStatus,
          response: responseText,
        }
      );

      // Log the result of the update to verify the response
      console.log("Updated Complaint:", result.data);
      // Manually update the complaint list with the updated status
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id
            ? { ...complaint, status: newStatus, response: responseText }
            : complaint
        )
      );
      fetchComplaints(); // Refresh complaints list after update
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Complaints Management</h1>

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
          <option value="Food">Food</option>
          <option value="Cleanliness">Cleanliness</option>
          
        </select>
      </div>
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
                <td>{complaint.response || "No response"}</td>
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
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        complaint._id,
                        "Resolved",
                        "Resolved by admin"
                      )
                    }
                  >
                    Mark as Resolved
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No complaints found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

*/

// admindashboard.jsx
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
        </select>
        
      </div>

      {/* Complaints Table */}
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No complaints found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
