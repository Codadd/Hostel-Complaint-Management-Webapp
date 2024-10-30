import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8093/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          name="name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="my-btn" type="submit">
          Sign Up
        </button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
