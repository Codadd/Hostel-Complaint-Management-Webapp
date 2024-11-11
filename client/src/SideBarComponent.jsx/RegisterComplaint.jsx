import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Adjust path if necessary
import "../Styles/RegisterComplaint.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const RegisterComplaint = () => {
  const { userEmail } = useContext(UserContext); // Assuming UserContext has the user’s email
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState(userEmail || ""); // Pre-fill based on context
  const [userName, setUserName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    //hostel
    const hostel = localStorage.getItem("hostel");

    console.log("User ID:", userId); // Check if this is correct
    console.log("Hostel ID:", hostel); // Check if this is correct

    // Check for userId availability
    if (!userId || !hostel ) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    // Proceed with complaint submission if both userId and hostel are available
    const complaintData = {
      hostel,
      userId,
      issueType,
      description,
      isAnonymous,
      email,
      ...(isAnonymous ? {} : { userName, roomNumber }),
    };

    try {
      const response = await axios.post(
        "http://localhost:8093/api/registercomplaint",
        complaintData
      );

      if (response.status === 201) {
        toast.success("Complaint submitted successfully!");
        setIssueType("");
        setDescription("");
        setIsAnonymous(false);
        setEmail(userEmail || "");
        setUserName("");
        setRoomNumber("");
      } else {
        toast.error(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
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
