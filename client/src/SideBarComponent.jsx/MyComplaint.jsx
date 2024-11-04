import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../Styles/MyComplaint.css";

const MyComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchComplaints = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8093/api/mycomplaint`,
        {
          headers: { userId },
        }
      );
      console.log("API Response:", response.data); // Log the entire response
      setComplaints(response.data.complaints || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="my-complaints-container">
      <h2>My Complaints</h2>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Description</th>
            <th>Issue Type</th>
            <th>Date Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(complaints) && complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint._id}</td>
                <td>{complaint.description}</td>
                <td>{complaint.issueType || "N/A"}</td>
                <td>
                  {new Date(complaint.createdAt).toLocaleDateString("en-US") ||
                    "N/A"}
                </td>
                <td>{complaint.status || "N/A"}</td>
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

export default MyComplaint;
