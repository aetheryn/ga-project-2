import React, { useContext, useEffect, useState } from "react";
import WatchedButton from "./WatchedButton";
import ToWatchButton from "./ToWatchButton";
import CardModal from "./CardModal";
import moviesContext from "../context/movies-context";

const Card = (props) => {
  const cardContext = useContext(moviesContext);
  const [showModal, setShowModal] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isToWatch, setIsToWatch] = useState(false);

  useEffect(() => {
    if (cardContext.watched.indexOf(`${props.movieId}`) > 1) {
      setIsWatched(true);
    }

    if (cardContext.toWatch.indexOf(`${props.movieId}`) > 1) {
      setIsToWatch(true);
    }
  });

  const handleClick = () => {
    setShowModal(true);
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
        ></CardModal>
      )}

      <div className="card">
        <img
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${props.imgurl}`}
        ></img>

        <div className="content">
          <div onClick={handleClick}>
            <h2>{props.title}</h2>
            <p> &#9733; {props.rating} / 10 </p>
          </div>

          <div>
            <WatchedButton
              movieId={props.movieId}
              isWatched={isWatched}
            ></WatchedButton>
          </div>
          <div>
            <ToWatchButton
              movieId={props.movieId}
              isToWatch={isToWatch}
            ></ToWatchButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
