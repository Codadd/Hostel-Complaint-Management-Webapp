// src/AdminComponents/ComplaintList.jsx
import React, { useState } from "react";

const ComplaintList = ({ complaints, handleStatusChange, handleAddResponse }) => {
  const [responseText, setResponseText] = useState("");

  return (
    <table className="complaint-table">
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
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <input
                  type="text"
                  placeholder="Add a response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleAddResponse(complaint._id, responseText);
                    setResponseText("");
                  }}
                >
                  Submit Response
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
  );
};

export default ComplaintList;
