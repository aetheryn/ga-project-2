import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import moviesContext from "../context/movies-context";

const ToWatch = () => {
  const toWatchContext = useContext(moviesContext);

  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <p>{toWatchContext.toWatch}</p>
      </div>
    </>
  );
};

export default ToWatch;
