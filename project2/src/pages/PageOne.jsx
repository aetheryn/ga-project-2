import React from "react";
import NavBar from "../components/NavBar";

const PageOne = () => {
  const [pageNum, setPageNum] = useState(1);
  const handlePlus = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };
  const handleMinus = () => {
    setPageNum((prevPageNum) => prevPageNum - 1);
  };
  return (
    <div>
      <NavBar></NavBar>
      <Movies pageNum={pageNum}></Movies>
      {pageNum !== 1 && <PrevButton onClick={handleMinus}></PrevButton>}
      <h1>{pageNum}</h1>
      <NextButton onClick={handlePlus}></NextButton>
    </div>
  );
};

export default PageOne;
