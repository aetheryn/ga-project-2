import React, { useContext, useEffect, useState } from "react";
import WatchedButton from "./WatchedButton";
import ToWatchButton from "./ToWatchButton";
import CardModal from "./CardModal";
import moviesContext from "../context/movies-context";
import thumbsDown from "../../../thumbsDown.png";

const Card = (props) => {
  const cardContext = useContext(moviesContext);
  const [showModal, setShowModal] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isToWatch, setIsToWatch] = useState(false);

  // --- Set button states with every movie card render --- //

  useEffect(() => {
    if (cardContext.watched.indexOf(`${props.movieId}`) > 1) {
      setIsWatched(true);
    }
    if (cardContext.toWatch.indexOf(`${props.movieId}`) > 1) {
      setIsToWatch(true);
    }
  });

  // --- Open movie card details --- //

  const handleClick = () => {
    setShowModal(true);
  };

  // --- Toggle buttons when either is clicked --- //

  const removeWatched = () => {
    const tempWatchedArray = [...cardContext.watched];
    tempWatchedArray.splice(tempWatchedArray.indexOf(`${props.movieId}`), 1);
    cardContext.setWatched(tempWatchedArray);
    setIsWatched(false);
  };

  const removeToWatch = () => {
    const tempToWatchArray = [...cardContext.toWatch];
    tempToWatchArray.splice(tempToWatchArray.indexOf(`${props.movieId}`), 1);
    cardContext.setToWatch(tempToWatchArray);
    setIsToWatch(false);
  };

  return (
    <>
      {showModal && (
        <CardModal
          movieId={props.movieId}
          title={props.title}
          imgurl={props.imgurl}
          overview={props.overview}
          rating={props.rating}
          releaseDate={props.releaseDate}
          setShowModal={setShowModal}
          isWatched={isWatched}
          setIsWatched={setIsWatched}
          isToWatch={isToWatch}
          setIsToWatch={setIsToWatch}
          removeWatched={removeWatched}
          removeToWatch={removeToWatch}
        ></CardModal>
      )}

      <div className="cards">
        <img
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${props.imgurl}`}
        ></img>

        <div className="content">
          <div className="show-modal" onClick={handleClick}>
            <h2>{props.title}</h2>
            <p> &#9733; {props.rating} / 10 </p>
          </div>
          <div className="card-buttons">
            {/* <div> */}
            <WatchedButton
              movieId={props.movieId}
              isToWatch={isToWatch}
              removeToWatch={removeToWatch}
              isWatched={isWatched}
              setIsWatched={setIsWatched}
              removeWatched={removeWatched}
            ></WatchedButton>
            {/* </div> */}
            {/* <div> */}
            <ToWatchButton
              movieId={props.movieId}
              isWatched={isWatched}
              removeWatched={removeWatched}
              isToWatch={isToWatch}
              setIsToWatch={setIsToWatch}
              removeToWatch={removeToWatch}
            ></ToWatchButton>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
