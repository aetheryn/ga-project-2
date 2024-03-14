import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import moviesContext from "../context/movies-context";
import RecMovs from "../components/RecMovs";

const Recommended = () => {
  const recContext = useContext(moviesContext);
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <RecMovs></RecMovs>
      </div>
    </>
  );
};

export default Recommended;
