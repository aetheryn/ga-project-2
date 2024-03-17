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

  // const removeWatched = () => {
  //   console.log(watchedBtnCtx.watched.indexOf(`${props.movieId}`));
  //   const tempWatchedArray = [...watchedBtnCtx.watched];
  //   tempWatchedArray.splice(tempWatchedArray.indexOf(`${props.movieId}`), 1);
  //   watchedBtnCtx.setWatched(tempWatchedArray);
  //   console.log(watchedBtnCtx.toWatch);
  //   props.setIsWatched(false);
  // };

  return (
    <>
      {!props.isWatched && (
        <button onClick={() => addWatched()} className="card-button">
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
