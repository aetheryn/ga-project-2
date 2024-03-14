import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import moviesContext from "./context/movies-context";
import AllMovies from "./pages/AllMovies";
import Recommended from "./pages/Recommended";
import Watched from "./pages/Watched";
import ToWatch from "./pages/ToWatch";

function App() {
  const [allRecords, setAllRecords] = useState([]);
  const [recordId, setRecordId] = useState("");
  const [username, setUsername] = useState("");
  const [watched, setWatched] = useState([]);
  const [notInterested, setNotInterested] = useState([]);
  const [toWatch, setToWatch] = useState([]);

  return (
    <moviesContext.Provider
      value={{
        allRecords,
        setAllRecords,
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
