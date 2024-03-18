import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import moviesContext from "./context/movies-context";
import AllMovies from "./pages/AllMovies";
import Recommended from "./pages/Recommended";
import Watched from "./pages/Watched";
import ToWatch from "./pages/ToWatch";

function App() {
  const [allRecords, setAllRecords] = useState([]);
  const [isFetchDone, setIsFetchDone] = useState(false);
  const [recordId, setRecordId] = useState("");
  const [username, setUsername] = useState("");
  const [watched, setWatched] = useState([]);
  const [notInterested, setNotInterested] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [watchedLimit, setWatchedLimit] = useState(false);
  const [toWatchLimit, setToWatchLimit] = useState(false);

  useEffect(() => {
    if (watched.length > 5) {
      alert(
        "You can't add any more movies to your Watched Movies as you have reached the maximum limit. Remove some from your list to continue."
      );
      setWatchedLimit(true);
    } else {
      setWatchedLimit(false);
    }
  }, [watched]);

  useEffect(() => {
    if (toWatch.length > 5) {
      alert(
        "You can't add any more movies to your To-Watch List as you have reached the maximum limit. Remove some from your list to continue."
      );
      setToWatchLimit(true);
    } else {
      setToWatchLimit(false);
    }
  }, [toWatch]);

  return (
    <moviesContext.Provider
      value={{
        allRecords,
        setAllRecords,
        isFetchDone,
        setIsFetchDone,
        recordId,
        setRecordId,
        username,
        setUsername,
        watched,
        setWatched,
        notInterested,
        setNotInterested,
        toWatch,
        setToWatch,
        watchedLimit,
        toWatchLimit,
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="main" element={<LoginPage></LoginPage>} />
        <Route path="discover" element={<AllMovies></AllMovies>} />
        <Route path="recommended" element={<Recommended></Recommended>} />
        <Route path="watched" element={<Watched></Watched>} />
        <Route path="to-watch" element={<ToWatch></ToWatch>} />
      </Routes>
    </moviesContext.Provider>
  );
}

export default App;
