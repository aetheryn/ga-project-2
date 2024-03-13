import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className="nav">
      <img></img>
      <ul>
        <li className="row">
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/discover"
          >
            All Movies
          </NavLink>
        </li>
        <li className="row">
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/watched"
          >
            Watched
          </NavLink>
        </li>
        <li className="row">
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/recommended"
          >
            Recommended
          </NavLink>
        </li>
        <li className="row">
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/to-watch"
          >
            To-Watch List
          </NavLink>
        </li>
        <li>
          <Link to="/main" style={{ color: "#5ab2ff" }}>
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
