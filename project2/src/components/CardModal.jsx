import React from "react";
import ReactDOM from "react-dom";
import styles from "./CardModal.module.css";
import WatchedButton from "./WatchedButton";
import ToWatchButton from "./ToWatchButton";

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div>
          <button
            className={styles.cancel}
            onClick={() => props.setShowModal(false)}
            style={{ float: "right" }}
          >
            &#x2715;
          </button>
        </div>

        <div className={`${styles.card} row`}>
          <div className={`${styles.poster} col-4`}>
            <img
              src={`https://media.themoviedb.org/t/p/w220_and_h330_face${props.imgurl}`}
            ></img>
          </div>

          <div className={`${styles.description} col-8`}>
            <h2>{props.title}</h2>
            <p className={styles.rating}> &#9733; {props.rating} / 10 </p>

            <div className="row">
              <div className="col-5">
                <WatchedButton
                  movieId={props.movieId}
                  isToWatch={props.isToWatch}
                  removeToWatch={props.removeToWatch}
                  isWatched={props.isWatched}
                  setIsWatched={props.setIsWatched}
                  removeWatched={props.removeWatched}
                ></WatchedButton>
              </div>
              <div className="col-5">
                <ToWatchButton
                  movieId={props.movieId}
                  isWatched={props.isWatched}
                  removeWatched={props.removeWatched}
                  isToWatch={props.isToWatch}
                  setIsToWatch={props.setIsToWatch}
                  removeToWatch={props.removeToWatch}
                ></ToWatchButton>
              </div>
            </div>

            <br />

            <p className={styles.overview}> {props.overview} </p>
            <p className={styles.date}> Release date: {props.releaseDate} </p>
          </div>
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
          isWatched={props.isWatched}
          setIsWatched={props.setIsWatched}
          isToWatch={props.isToWatch}
          setIsToWatch={props.setIsToWatch}
          removeWatched={props.removeWatched}
          removeToWatch={props.removeToWatch}
        ></OverLay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CardModal;
