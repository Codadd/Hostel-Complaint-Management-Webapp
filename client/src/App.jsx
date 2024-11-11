
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import AdminLogin from "./AdminComponents/AdminLogin";
import AdminSignup from "./AdminComponents/AdminSignup";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import AboutUs from "./SideBarComponent.jsx/AboutUs";
import MyComplaint from "./SideBarComponent.jsx/MyComplaint";
import RegisterComplaint from "./SideBarComponent.jsx/RegisterComplaint";
import MainPage from "./Components/MainPage"; // Import MainPage component
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserContext";
import AdminDashboard from "./AdminComponents/AdminDashboard";

import ComplaintsGraph from "./AdminComponents/ComplaintsGraph"; // Import ComplaintsGraph

// ProtectedRoute component for authenticated routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("userId"); // Check if user is logged in
  return isAuthenticated ? children : <Navigate to="/mainpage" />; // Redirect to MainPage if not authenticated
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Page as Default Landing Route */}
          <Route path="/mainpage" element={<MainPage />} /> 

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} /> {/* User Signup */}
          <Route path="/login" element={<Login />} /> {/* User Login */}
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />

          {/* Protected Routes */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/complaints-graph" element={<ComplaintsGraph />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registercomplaint"
            element={
              <ProtectedRoute>
                <RegisterComplaint />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mycomplaint"
            element={
              <ProtectedRoute>
                <MyComplaint />
              </ProtectedRoute>
            }
          />

          {/* Redirect all other paths to MainPage on initial load */}
          <Route path="*" element={<Navigate to="/mainpage" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
