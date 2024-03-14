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
        <WatchedMovies></WatchedMovies>
      </div>
    </>
  );
};

export default Watched;
