import React from "react";
import logo from "../assets/images/logo.png";
import landing from "../assets/images/landing.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="navbar">
        <img src={logo} alt="book" className="logo" />
        <div className="nav-btns">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to={"/register"} className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
      <div className="content">
        <article className="landing-text">
          <h1>
            Welcome to <span>B</span>ook<span>K</span>eep
          </h1>
          <p>
            Your personal digital library and reading companion! With BookKeep,
            effortlessly manage your book collection, set and track reading
            goals, and gain insights into your reading habits. Whether you're
            exploring new genres or revisiting old favorites, our intuitive
            platform helps you organize your reading life, connect with fellow
            book enthusiasts, and find inspiration for your next great read.
            Join BookKeep today and turn every page into an adventure
          </p>
        </article>
        <img src={landing} alt="landing" />
      </div>
    </div>
  );
};

export default Landing;
