import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Adjust the path as needed
import "./Dashboard.css"; // Import dashboard-specific styles

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/")) // Redirect to login page
      .catch((error) => console.error("Error during logout: ", error));
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => navigate("/Dashboard/Students")}>Students</li>
          <li onClick={handleLogout}>Sign Out</li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <Outlet /> {/* Placeholder for child routes like StudentsPage */}
      </main>
    </div>
  );
};

export default Dashboard;
