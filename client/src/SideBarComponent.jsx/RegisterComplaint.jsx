import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Adjust the path if necessary
import "../Styles/RegisterComplaint.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterComplaint = () => {
  const { userEmail } = useContext(UserContext); // Assuming you want to pre-fill with user's email if logged in
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState(userEmail || ""); // Set initial value based on context
  const [userName, setUserName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintData = {
      issueType,
      description,
      isAnonymous,
      email, // Include email in the complaint data
      ...(isAnonymous ? {} : { userName, roomNumber }),
    };

    try {
      const response = await fetch(
        "http://localhost:8093/api/registercomplaint",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(complaintData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Complaint submitted successfully!");
        // Clear the form
        setIssueType("");
        setDescription("");
        setIsAnonymous(false);
        setEmail(userEmail || ""); // Reset email
        setUserName("");
        setRoomNumber("");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error("Error submitting complaint. Please try again.");
    }
  };

  return (
    <div className="register-complaint">
      <ToastContainer />
      <h2>Register a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="issueType">Issue Type</label>
          <select
            id="issueType"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            required
          >
            <option value="">Select an issue type</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Noise">Noise</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Describe your issue..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Submit anonymously
          </label>
        </div>
        {!isAnonymous && (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default RegisterComplaint;
