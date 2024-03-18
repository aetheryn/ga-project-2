import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import WatchedMovies from "../components/WatchedMovies";
import moviesContext from "../context/movies-context";

const Watched = () => {
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
            <h1>You have watched...</h1>
            <WatchedMovies></WatchedMovies>
            <div className="bottom-overlay"></div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
};

export default Watched;
