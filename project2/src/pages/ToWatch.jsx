import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import moviesContext from "../context/movies-context";
import ToWatchMovies from "../components/ToWatchMovies";

const ToWatch = () => {
  const toWatchContext = useContext(moviesContext);

  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main row">
        <div className="col-1"></div>
        <div className="col-10">
          <ToWatchMovies></ToWatchMovies>
        </div>
        <div className="col-1"></div>
      </div>
    </>
  );
};

export default ToWatch;
