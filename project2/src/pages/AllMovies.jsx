import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Movies from "../components/Movies";
// import PrevButton from "../components/PrevButton";
// import NextButton from "../components/NextButton";
import search from "../../../search.png";
import PageButton from "../components/PageButton";

const AllMovies = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  // --- Handle page numbers --- //

  const handlePlus = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };
  const handleMinus = () => {
    setPageNum((prevPageNum) => prevPageNum - 1);
  };

  // --- Handle change in search bar --- //

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setPageNum(1);
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
            <div className="top-overlay"></div>
            <div className="row">
              <div className="col-7">
                <h1>Movies List</h1>
              </div>

              <div
                className="col-5"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  id="search"
                  value={searchInput}
                  className="search-bar"
                  type="text"
                  placeholder="Search for movies..."
                  onChange={(event) => {
                    handleChange(event);
                  }}
                ></input>
                <button className="search-btn">
                  <img className="search-icon" src={search} />
                </button>
              </div>
            </div>

            <Movies searchInput={searchInput} pageNum={pageNum}></Movies>
            <div className="bottom-overlay"></div>
          </div>
          <div className="col-1"></div>
        </div>

        <div className="page row">
          <div className="col-4"></div>
          <div className="col-1">
            {pageNum !== 1 && (
              <PageButton onClick={handleMinus}>&#8249;</PageButton>
            )}
          </div>

          <div className="page-num col-2">
            <h1>{pageNum}</h1>
          </div>

          <div className="next-btn col-1">
            <PageButton onClick={handlePlus}>&#8250;</PageButton>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
};

export default AllMovies;
