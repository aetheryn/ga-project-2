import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Movies from "../components/Movies";
import PrevButton from "../components/PrevButton";
import NextButton from "../components/NextButton";

const AllMovies = () => {
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
        <Movies pageNum={pageNum}></Movies>
        {pageNum !== 1 && <PrevButton onClick={handleMinus}></PrevButton>}
        <h1>{pageNum}</h1>
        <NextButton onClick={handlePlus}></NextButton>
      </div>
    </>
  );
};

export default AllMovies;
