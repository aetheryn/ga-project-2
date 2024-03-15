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
      <div className="main row">
        <div className="col-1"></div>
        <div className="col-10">
          <RecMovs></RecMovs>
        </div>
        <div className="col-1"></div>
      </div>
    </>
  );
};

export default Recommended;
