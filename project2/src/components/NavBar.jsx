import React, { useContext, useState } from "react";
import { Navigate, NavLink, Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import moviesContext from "../context/movies-context";

const NavBar = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navBarContext = useContext(moviesContext);

  const storeData = async () => {
    console.log(navBarContext.watched);
    console.log(navBarContext.watched.toString());
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
        },
        body: JSON.stringify({
          fields: {
            username: navBarContext.username,
            watched: navBarContext.watched.toString(),
            notInterested: navBarContext.notInterested.toString(),
            toWatch: navBarContext.toWatch.toString(),
          },
        }),
      };

      const response = await fetch(
        import.meta.env.VITE_AIRTABLE_SERVER + "/" + navBarContext.recordId,
        options
      );

      if (response.ok) {
        console.log("OK!");
        setIsLoggedOut(true);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

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

        <button onClick={() => storeData()}>Log Out</button>
      </ul>

      {isLoggedOut && <Navigate to="/main"> </Navigate>}
    </nav>
  );
};

export default NavBar;
