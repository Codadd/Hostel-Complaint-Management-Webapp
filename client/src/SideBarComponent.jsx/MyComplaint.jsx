import React, { useEffect, useState } from "react";
import Axios from "axios";

const MyComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchUserComplaints();
    } else {
      console.error("User not logged in");
    }
  }, [userId]);

  // Fetch complaints for the logged-in user
  const fetchUserComplaints = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8093/api/mycomplaint",
        {
          headers: { userid: userId },
        }
      );
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  return (
    <div className="my-complaints">
      <h1>My Complaints</h1>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Issue Type</th>
            <th>Description</th>
            <th>Date Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints && complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                {/* Wrapping each piece of content in a <td> */}
                <td>{complaint.issueType}</td>
                <td>{complaint.description}</td>
                <td>
                  {new Date(complaint.dateSubmitted).toLocaleDateString(
                    "en-US"
                  )}
                </td>
                <td>{complaint.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No complaints found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyComplaint;
