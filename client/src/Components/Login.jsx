import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Make sure this file exists

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [hostel, setHostel] = useState(""); // state for hostel

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password || !hostel) {
      alert("Please fill in all the fields (User ID, Password, Hostel).");
      return; // Prevent form submission if fields are empty
    }
   
    Axios.post("http://localhost:8093/auth/login", {
      userId,
      password,
      hostel//hostel
    })
      .then((response) => {
        if (response.data && /*response.data.userId*/ response.data.status) {
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("hostel", response.data.hostel); // Store hostel information

          console.log("User ID saved to local storage:", response.data.userId,response.data.hostel);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error logging in:", err);
      });
  };

  return (
    <div className="container">
      <h2>Login!</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="User ID"
          name="userId"
          onChange={(e) => setUserId(e.target.value)} // Set user ID state
        />
        <input
          placeholder="Password"
          name="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)} // Set password state
        />
        {/* Hostel Dropdown */}
        {/* <label htmlFor="hostel">Select Hostel:</label> */}
        <select
          id="hostel"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)} // Update state when a hostel is selected
        >
          <option value="">Select a hostel</option>
          <option value="KNGH">KNGH</option>
          <option value="DJGH">DJGH</option>
          <option value="PATEL">PATEL</option>
          <option value="NBH">NBH</option>
          <option value="SVH">SVH</option>
          <option value="MALVIYA">MALVIYA</option>
          <option value="TILAK">TILAK</option>
          <option value="TANDON">TANDON</option>
          <option value="IHB">IHB</option>
          <option value="SNGH">SNGH</option>
          <option value="TAGORE">TAGORE</option>
        </select>
        <button className="my-btn" type="submit">
          Login
        </button>
        <Link to="/forgotPassword">Forgot Password</Link>
        <p>
          Don&apos;t Have Account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
