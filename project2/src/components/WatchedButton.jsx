import React, { useContext, useState } from "react";
import moviesContext from "../context/movies-context";

const WatchedButton = (props) => {
  const watchedBtnCtx = useContext(moviesContext);

  const addWatched = () => {
    if (props.isToWatch) {
      props.removeToWatch();
    }

    watchedBtnCtx.setWatched((prevState) => {
      return [...prevState, `${props.movieId}`];
    });
  };

  return (
    <>
      {!props.isWatched && (
        <button
          onClick={() => addWatched()}
          className="card-button"
          disabled={watchedBtnCtx.watchedLimit}
        >
          Add to Watched
        </button>
      )}

      {props.isWatched && (
        <button
          className="active-card-button"
          onClick={() => props.removeWatched()}
        >
          Remove from Watched
        </button>
      )}
    </>
  );
};

export default WatchedButton;
