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
      <div className="main row">
        <div className="col-1"></div>
        <div className="col-10">
          <WatchedMovies></WatchedMovies>
        </div>
      </div>
      <div className="col-1"></div>
    </>
  );
};

export default Watched;
