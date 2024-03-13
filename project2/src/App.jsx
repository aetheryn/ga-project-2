import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import axios from "axios";
import Movies from "./components/Movies";
import NextButton from "./components/NextButton";
import PrevButton from "./components/PrevButton";

function App() {
  const [user, setUser] = useState([{ username: "", password: "" }]);
  const storeData = () => {
    console.log("data is stored.");
  };
  const checkCredentials = () => {
    // if username & password is valid
  };

  const [pageNum, setPageNum] = useState(1);
  const handlePlus = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };
  const handleMinus = () => {
    setPageNum((prevPageNum) => prevPageNum - 1);
  };

  return (
    <div>
      <LandingPage
        user={user}
        setUser={setUser}
        storeData={storeData}
      ></LandingPage>
      <Movies pageNum={pageNum}></Movies>
      {pageNum !== 1 && <PrevButton onClick={handleMinus}></PrevButton>}
      <h1>{pageNum}</h1>
      <NextButton onClick={handlePlus}></NextButton>
    </div>
  );
}

export default App;
