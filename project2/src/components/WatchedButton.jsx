import React, { useContext } from "react";
import moviesContext from "../context/movies-context";

const WatchedButton = (props) => {
  const watchedBtnCtx = useContext(moviesContext);

  const addWatched = () => {
    console.log(props.movieId);
    const watchedMoviesArray = [...watchedBtnCtx.watched];
    console.log(watchedMoviesArray);
    watchedMoviesArray.unshift(props.movieId);
    watchedBtnCtx.setWatched(watchedMoviesArray);
    console.log(watchedBtnCtx.watched);
  };

  return <button onClick={() => addWatched()}>Add to Watched</button>;
};

export default WatchedButton;
