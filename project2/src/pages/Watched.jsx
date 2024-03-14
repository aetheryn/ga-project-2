import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import WatchedMovies from "../components/WatchedMovies";
import moviesContext from "../context/movies-context";

const Watched = () => {
  const watchedContext = useContext(moviesContext);

  console.log(watchedContext.watched);

  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <p>{watchedContext.watched}</p>
        {/* <WatchedMovies></WatchedMovies> */}
      </div>
    </>
  );
};

export default Watched;
