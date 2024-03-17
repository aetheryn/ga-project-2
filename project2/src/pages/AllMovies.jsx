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
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 display">
            <h1>Movies List</h1>
            <Movies pageNum={pageNum}></Movies>
          </div>
          <div className="col-1"></div>
        </div>

        <div className="page row">
          <div className="col-4"></div>
          <div className="col-1">
            {pageNum !== 1 && <PrevButton onClick={handleMinus}></PrevButton>}
          </div>

          <div className="page-num col-2">
            <h1>{pageNum}</h1>
          </div>

          <div className="next-btn col-1">
            <NextButton onClick={handlePlus}></NextButton>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
};

export default AllMovies;
