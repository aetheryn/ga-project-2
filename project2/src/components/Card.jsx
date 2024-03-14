import React, { useState } from "react";
import WatchedButton from "./WatchedButton";
import ToWatchButton from "./ToWatchButton";
import CardModal from "./CardModal";

const Card = (props) => {
  const [showModal, setShowModal] = useState(false);

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

      <div>
        <img
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${props.imgurl}`}
        ></img>
        <div onClick={handleClick}>
          <h2>{props.title}</h2>
          <p> &#9733; {props.rating} / 10 </p>
        </div>
        <WatchedButton movieId={props.movieId}></WatchedButton>
        <ToWatchButton></ToWatchButton>
      </div>
    </>
  );
};

export default Card;
