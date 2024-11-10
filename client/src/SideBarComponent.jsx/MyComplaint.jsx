import { useEffect, useState } from "react";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // const fetchComplaints = async () => {
  //   try {
  //     const response = await Axios.get(
  //       `http://localhost:8093/api/mycomplaint`,
  //       {
  //         headers: { userId },
  //       }
  //     );
  //     console.log("API Response:", response.data); // Log the entire response
  //     setComplaints(response.data.complaints || []);
  //   } catch (error) {
  //     console.error("Error fetching complaints:", error);
  //     setComplaints([]); // Set to empty array on error
  //   }
  // };
    
  // useEffect(() => {
  //   fetchComplaints();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

  // Handle feedback change
  const handleFeedbackChange = (id, feedback) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint._id === id ? { ...complaint, feedback: feedback } : complaint
      )
    );
  };
   
    // Submit feedback
    const handleSubmitFeedback = async (id, feedback) => {
      try {
        await Axios.put(`http://localhost:8093/complaints/feedback/${id}`, {
          feedback: feedback,
        });
        fetchUserComplaints(); // Refresh complaints after feedback submission
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    };

  return (
    <div className="my-complaints-container">
      <h2>My Complaints</h2>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Issue Type</th>
            <th>Description</th>
            <th>Date Submitted</th>
            <th>Status</th>

            <th>Feedback</th>

          </tr>
        </thead>
        <tbody>
          {complaints && complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.issueType}</td>
                <td>{complaint.description}</td>
                <td>
                  {new Date(complaint.createdAt).toLocaleDateString("en-US")}
                </td>
                <td>{complaint.status}</td>

                <td>
                  {complaint.status === "resolved" ? (
                    <div>
                      <textarea
                        placeholder="Enter feedback"
                        value={complaint.feedback || ""}
                        onChange={(e) => handleFeedbackChange(complaint._id, e.target.value)}
                        />
                        <button
                           onClick={()=>handleSubmitFeedback(complaint._id, complaint.feedback)}>
                            Submit Feedback
                           </button>
                    </div>
                  ) : (<span>No feedback yet</span>)}
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


export default MyComplaint;
