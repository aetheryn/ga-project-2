import React, { useState } from "react";
import NavBar from "../components/NavBar";
import WatchedMovies from "../components/WatchedMovies";
import PrevButton from "../components/PrevButton";
import NextButton from "../components/NextButton";

const Watched = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const handlePlus = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };
  const handleMinus = () => {
    setPageNum((prevPageNum) => prevPageNum - 1);
  };

  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <p>{props.watched}</p>
        <WatchedMovies
          pageNum={pageNum}
          watched={props.watched}
        ></WatchedMovies>
        {pageNum !== 1 && <PrevButton onClick={handleMinus}></PrevButton>}
        <h1>{pageNum}</h1>
        <NextButton onClick={handlePlus}></NextButton>
      </div>
    </>
  );
};

export default Watched;
