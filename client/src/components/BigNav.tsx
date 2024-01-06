import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const BigNav = () => {
  return (
    <nav className="nav-container">
      <img src={logo} alt="book" className="logo" />
      <div className="nav-links">
        <NavLink to="." key="Reading Now" className="nav-link" end>
          Reading Now
        </NavLink>
        <NavLink to="have-read" key="Have Read" className="nav-link" end>
          Have Read
        </NavLink>
        <NavLink to="will-read" key="Will Read" className="nav-link" end>
          Will Read
        </NavLink>
        <NavLink to="add-book" key="Add Book" className="nav-link" end>
          Add Book
        </NavLink>
        <NavLink to="profile" key="Profile" className="nav-link" end>
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default BigNav;
