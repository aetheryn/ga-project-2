import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import moviesContext from "../context/movies-context";

const Recommended = () => {
  const recContext = useContext(moviesContext);
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <p>{recContext.notInterested}</p>
      </div>
    </>
  );
};

export default Recommended;
