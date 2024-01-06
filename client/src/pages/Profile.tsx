import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="profile">
      <div className="stats">
        <div className="stat">
          <h3>0 Books Read</h3>
        </div>
        <div className="stat">
          <h3>0 Books Reading</h3>
        </div>
        <div className="stat">
          <h3>0 Books To Read</h3>
        </div>
      </div>
      <div className="profile-info">
        <h3>Profile</h3>
        <p>Username: test@gmail.com </p>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
