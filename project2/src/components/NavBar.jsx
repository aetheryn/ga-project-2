import React, { useContext, useState } from "react";
import { Navigate, NavLink, Link } from "react-router-dom";
import moviesContext from "../context/movies-context";
import styles from "./NavBar.module.css";
import icon from "../../../icon.png";

const NavBar = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navBarContext = useContext(moviesContext);

  // --- Update data on Airtable --- //

  const storeData = async () => {
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
            toWatch: navBarContext.toWatch.toString(),
          },
        }),
      };

      const response = await fetch(
        import.meta.env.VITE_AIRTABLE_SERVER + "/" + navBarContext.recordId,
        options
      );

      if (response.ok) {
        setIsLoggedOut(true);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  // --- Handle click on log-out --- //

  const handleLogOut = () => {
    storeData();
    navBarContext.setUsername("");
    navBarContext.setRecordId("");
    navBarContext.setWatched([]);
    navBarContext.setToWatch([]);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navicon}>
        <img className={styles.icon} src={icon}></img>
      </div>

      <div className={styles.navlinks}>
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
      </div>

      <div className={styles.logout}>
        <button onClick={() => handleLogOut()}>Log Out</button>
      </div>

      {isLoggedOut && <Navigate to="/main"> </Navigate>}
    </div>
  );
};

export default NavBar;
