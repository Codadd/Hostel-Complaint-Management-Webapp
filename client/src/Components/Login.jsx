import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Make sure this file exists

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD

  const [hostel, setHostel] = useState(""); // state for hostel

=======
  const [hostel, setHostel] = useState(""); // state for hostel
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD

=======
    // Check if fields are empty and show a popup if necessary
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
    if (!userId || !password || !hostel) {
      alert("Please fill in all the fields (User ID, Password, Hostel).");
      return; // Prevent form submission if fields are empty
    }
<<<<<<< HEAD
   
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
=======
    Axios.post("http://localhost:8093/auth/login", {
      userId,
      password,
      hostel,
    })
      .then((response) => {
        if (response.data && response.data.status) {
          // Store userId and hostel in localStorage upon successful login
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("hostel", response.data.hostel); // Store hostel information

          console.log(
            "User ID and Hostel saved to local storage:",
            response.data.userId,
            response.data.hostel
          );
          navigate("/"); // Redirect to home page after successful login
        } else {
          console.log("Login failed:", response.data.message);
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
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
<<<<<<< HEAD
          Don&apos;t Have Account? <Link to="/signup">Signup</Link>
=======
          Don't Have an Account? <Link to="/signup">Sign Up</Link>
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
        </p>
      </form>
    </div>
  );
};

export default Login;
