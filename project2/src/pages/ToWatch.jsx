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
      <div className="main">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 display">
            <div className="top-overlay"></div>
            <h1>Your To-Watch List</h1>
            <ToWatchMovies></ToWatchMovies>
            <div className="bottom-overlay"></div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
};

export default ToWatch;
