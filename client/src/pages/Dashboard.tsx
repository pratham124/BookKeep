import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";
import BigNav from "../components/BigNav";

const Dashboard = () => {
  return (
    <main>
      <BigNav />
      <div className="dashboard-page">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
