import React, { useContext } from "react";
import moviesContext from "../context/movies-context";

const ToWatchButton = (props) => {
  const toWatchBtnContext = useContext(moviesContext);

  const addToWatch = () => {
    if (props.isWatched) {
      props.removeWatched();
    }
    toWatchBtnContext.setToWatch((prevState) => {
      return [...prevState, `${props.movieId}`];
    });
  };

  // const removeToWatch = () => {
  //   console.log(toWatchBtnContext.toWatch.indexOf(`${props.movieId}`));
  //   const tempToWatchArray = [...toWatchBtnContext.toWatch];
  //   tempToWatchArray.splice(tempToWatchArray.indexOf(`${props.movieId}`), 1);
  //   toWatchBtnContext.setToWatch(tempToWatchArray);
  //   console.log(toWatchBtnContext.toWatch);
  //   props.setIsToWatch(false);
  // };

  return (
    <>
      {!props.isToWatch && (
        <button onClick={() => addToWatch()} className="card-button">
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
