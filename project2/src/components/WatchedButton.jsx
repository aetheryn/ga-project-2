import React, { useContext } from "react";
import moviesContext from "../context/movies-context";

const WatchedButton = (props) => {
  const watchedBtnCtx = useContext(moviesContext);

  // --- Set state of watched / add to Watched list & remove from To-Watch --- //

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
