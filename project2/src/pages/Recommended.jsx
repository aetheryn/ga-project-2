import React, { useContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import moviesContext from "../context/movies-context";
import RecMovs from "../components/RecMovs";

const Recommended = () => {
  const [isOnRecPage, setIsOnRecPage] = useState(true);
  const recContext = useContext(moviesContext);

  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 display">
            <div className="top-overlay"></div>
            <h1>Similar to what you've watched...</h1>
            <RecMovs isOnRecPage={isOnRecPage}></RecMovs>
            <div className="bottom-overlay"></div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
};

export default Recommended;
