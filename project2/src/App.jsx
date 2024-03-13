import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Movies from "./components/Movies";
import NextButton from "./components/NextButton";
import PrevButton from "./components/PrevButton";

function App() {
  const [allRecords, setAllRecords] = useState([]);
  const [recordId, setRecordId] = useState("");
  const [watched, setWatched] = useState([]);
  const [notInterested, setNotInterested] = useState([]);
  const [toWatch, setToWatch] = useState([]);

  return (
    <div>
      <LoginPage
        allRecords={allRecords}
        setAllRecords={setAllRecords}
        recordId={recordId}
        setRecordId={setRecordId}
        watched={watched}
        setWatched={setWatched}
        notInterested={notInterested}
        setNotInterested={setNotInterested}
        toWatch={toWatch}
        setToWatch={setToWatch}
      ></LoginPage>
    </div>
  );
}

export default App;
