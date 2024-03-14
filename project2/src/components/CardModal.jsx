import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import WatchedButton from "./WatchedButton";
import ToWatchButton from "./ToWatchButton";

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button onClick={() => props.setShowModal(false)}>Close</button>
        <div>
          <img
            src={`https://media.themoviedb.org/t/p/w220_and_h330_face${props.imgurl}`}
          ></img>
          <div>
            <h2>{props.title}</h2>
            <p> &#9733; {props.rating} / 10 </p>
            <p> {props.overview} </p>
            <p> {props.releaseDate} </p>
          </div>
          <WatchedButton></WatchedButton>
          <ToWatchButton></ToWatchButton>
        </div>
      </div>
    </div>
  );
};

const CardModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          movieId={props.movieId}
          title={props.title}
          imgurl={props.imgurl}
          overview={props.overview}
          rating={props.rating}
          releaseDate={props.releaseDate}
          setShowModal={props.setShowModal}
        ></OverLay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CardModal;
