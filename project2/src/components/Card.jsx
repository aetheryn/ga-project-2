import React from "react";
import WatchedButton from "./WatchedButton";
import ToWatchButton from "./ToWatchButton";

const Card = (props) => {
  return (
    <div>
      <img
        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${props.imgurl}`}
      ></img>
      <div>
        <h2>{props.title}</h2>
        <p> &#9733; {props.rating} / 10 </p>
      </div>
      <WatchedButton></WatchedButton>
      <ToWatchButton></ToWatchButton>
    </div>
  );
};

export default Card;
