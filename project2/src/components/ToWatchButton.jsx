import React, { useContext } from "react";
import moviesContext from "../context/movies-context";

const ToWatchButton = (props) => {
  const toWatchBtnContext = useContext(moviesContext);

  const addToWatch = () => {
    toWatchBtnContext.setToWatch((prevState) => {
      return [...prevState, props.movieId];
    });
  };

  return <button onClick={() => addToWatch()}>Add to To-Watch List</button>;
};

export default ToWatchButton;
