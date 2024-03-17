import React, { useContext, useState } from "react";
import moviesContext from "../context/movies-context";

const WatchedButton = (props) => {
  const watchedBtnCtx = useContext(moviesContext);

  const addWatched = () => {
    watchedBtnCtx.setWatched((prevState) => {
      return [...prevState, `${props.movieId}`];
    });

    console.log("Clicked.");
  };

  return (
    <button
      onClick={() => addWatched()}
      disabled={props.isWatched}
      className="card-button"
    >
      Add to Watched
    </button>
  );
};

export default WatchedButton;
