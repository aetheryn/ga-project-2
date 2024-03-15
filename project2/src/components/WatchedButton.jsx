import React, { useContext, useState } from "react";
import moviesContext from "../context/movies-context";

const WatchedButton = (props) => {
  const watchedBtnCtx = useContext(moviesContext);

  const addWatched = () => {
    watchedBtnCtx.setWatched((prevState) => {
      return [...prevState, `${props.movieId}`];
    });
  };

  return (
    <button onClick={() => addWatched()} disabled={props.isWatched}>
      Add to Watched
    </button>
  );
};

export default WatchedButton;
