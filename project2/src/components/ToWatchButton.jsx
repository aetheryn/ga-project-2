import React, { useContext } from "react";
import moviesContext from "../context/movies-context";

const ToWatchButton = (props) => {
  const toWatchBtnContext = useContext(moviesContext);

  // --- Add to To-Watch list --- //

  const addToWatch = () => {
    if (props.isWatched) {
      props.removeWatched();
    }

    toWatchBtnContext.setToWatch((prevState) => {
      return [...prevState, `${props.movieId}`];
    });
  };

  return (
    <>
      {!props.isToWatch && (
        <button
          onClick={() => addToWatch()}
          className="card-button"
          disabled={toWatchBtnContext.toWatchLimit}
        >
          Add to To-Watch List
        </button>
      )}

      {props.isToWatch && (
        <button
          className="active-card-button"
          onClick={() => props.removeToWatch()}
        >
          Remove from Your List
        </button>
      )}
    </>
  );
};

export default ToWatchButton;
