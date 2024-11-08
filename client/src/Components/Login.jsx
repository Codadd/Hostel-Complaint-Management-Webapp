import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Make sure this file exists
const Login = () => {
  const [userId, setUserId] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8093/auth/login", {
      userId,
      password,
    })
      .then((response) => {
        if (response.data && response.data.userId) {
          localStorage.setItem("userId", response.data.userId);
          console.log("User ID saved to local storage:", response.data.userId);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <h2>Login!</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="User ID"
          name="userId"
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          placeholder="password"
          name="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="my-btn" type="submit">
          Login
        </button>
        <Link to="/forgotPassword">Forgot Password</Link>
        <p>
          Don't Have Account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;