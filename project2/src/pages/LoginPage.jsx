import React, { useContext, useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import NewUserModal from "../components/NewUserModal";
import moviesContext from "../context/movies-context";
import icon from "../../../icon.png";

const LoginPage = () => {
  const userContext = useContext(moviesContext);
  const [userAlert, setUserAlert] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  // --- Fetch all entries in Airtable --- //

  const getAllRecords = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
        },
      };

      const response = await fetch(
        import.meta.env.VITE_AIRTABLE_SERVER,
        options
      );

      if (response.ok) {
        const data = await response.json();
        userContext.setAllRecords(data.records);
        userContext.setIsFetchDone(true);
        retrieveUserData(data.records);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  // --- Read each Airtable row to find a matching username & retrieve data from columns to set states --- //

  const retrieveUserData = (allRecords) => {
    for (let i = 0; i < allRecords.length; i++) {
      if (userContext.username === allRecords[i].fields.username) {
        userContext.setRecordId(allRecords[i].id);
        userContext.setWatched(
          Array.from(allRecords[i].fields.watched.split(","))
        );
        userContext.setToWatch(
          Array.from(allRecords[i].fields.toWatch.split(","))
        );
        setUserLogin(true);
      }
    }

    setUserAlert(true);
  };

  // --- Initialise functions upon clicking login --- //

  const handleLogIn = () => {
    getAllRecords();
  };

  // --- Initialise functions to trigger modal to create new user --- //

  const handleCreate = () => {
    userContext.setIsFetchDone(false);
    setShowNewUserModal(true);
  };

  return (
    <div className="login-page">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 centered">
          <img className="icon" src={icon}></img>
        </div>
        <div className="col-2"></div>
      </div>

      <div className="login row">
        <div className="col-3"></div>

        <div className="col-6 centered">
          <input
            id="username"
            value={userContext.username}
            type="text"
            placeholder="Enter Username"
            onChange={(event) => {
              userContext.setUsername(event.target.value);
              setUserAlert(false);
            }}
          ></input>

          {userAlert && (
            <>
              <br />
              <div style={{ fontSize: "smaller", color: "white" }}>
                User does not exist.
              </div>
            </>
          )}
          <br />

          <button onClick={handleLogIn}>LOGIN</button>

          <br />

          <button className="new-account" onClick={() => handleCreate()}>
            Alternatively, create a new account.
          </button>
        </div>

        <div className="col-3"></div>

        {showNewUserModal && (
          <NewUserModal
            username={userContext.username}
            setUsername={userContext.setUsername}
            isFetchDone={userContext.isFetchDone}
            setIsFetchDone={userContext.isFetchDone}
            setShowNewUserModal={setShowNewUserModal}
            getAllRecords={getAllRecords}
            retrieveUserData={retrieveUserData}
            userAlert={userAlert}
            setUserAlert={setUserAlert}
          ></NewUserModal>
        )}
      </div>

      {userLogin && userContext.isFetchDone && (
        <>
          <Navigate to="/discover" replace={true} />
        </>
      )}
    </div>
  );
};

export default LoginPage;
