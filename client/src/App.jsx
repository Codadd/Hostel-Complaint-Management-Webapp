import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import AboutUs from "./SideBarComponent.jsx/AboutUs";
import MyComplaint from "./SideBarComponent.jsx/MyComplaint";
import RegisterComplaint from "./SideBarComponent.jsx/RegisterComplaint";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/registercomplaint"
            element={<RegisterComplaint />}
          ></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route
            path="/resetPassword/:token"
            element={<ResetPassword />}
          ></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/mycomplaint" element={<MyComplaint />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
