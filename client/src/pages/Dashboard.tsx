import { Outlet } from "react-router-dom";
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
