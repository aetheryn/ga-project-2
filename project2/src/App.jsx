import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";
import NextButton from "./components/NextButton";
import PrevButton from "./components/PrevButton";
import AllMovies from "./pages/AllMovies";
import Recommended from "./pages/Recommended";
import Watched from "./pages/Watched";
import ToWatch from "./pages/ToWatch";

function App() {
  const [allRecords, setAllRecords] = useState([]);
  const [recordId, setRecordId] = useState("");
  const [watched, setWatched] = useState([]);
  const [notInterested, setNotInterested] = useState([]);
  const [toWatch, setToWatch] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/main" />} />
      <Route
        path="main"
        element={
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
        }
      />
      <Route path="discover" element={<AllMovies></AllMovies>} />
      <Route path="recommended" element={<Recommended></Recommended>} />
      <Route path="watched" element={<Watched></Watched>} />
      <Route path="to-watch" element={<ToWatch></ToWatch>} />
    </Routes>
  );
}

export default App;
