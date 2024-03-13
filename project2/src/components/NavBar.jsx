import React from "react";
import { Navigate, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <img></img>
      <ul>
        <li>My Watched</li>
        <li>Recommended</li>
        <li>To Watch</li>
      </ul>
      <Link to="/main">Log Out</Link>
    </div>
  );
};

export default NavBar;
