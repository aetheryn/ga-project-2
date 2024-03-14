import React, { useContext, useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import NewUserModal from "../components/NewUserModal";
import moviesContext from "../context/movies-context";

const LoginPage = () => {
  const userContext = useContext(moviesContext);
  const [userAlert, setUserAlert] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const usernameRef = useRef();

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
        console.log(data);

        userContext.setAllRecords(data.records);
        console.log(userContext.allRecords);

        userContext.setIsFetchDone(true);
        console.log(userContext.isFetchDone);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getAllRecords();
  }, []);

  const retrieveUserData = () => {
    console.log("Retrieving User Data...");

    for (let i = 0; i < userContext.allRecords.length; i++) {
      console.log(`Reading line ${i + 1}...`);
      console.log(userContext.username);
      console.log(userContext.allRecords[i].fields.username);

      if (userContext.username === userContext.allRecords[i].fields.username) {
        userContext.setRecordId(userContext.allRecords[i].id);

        userContext.setWatched(
          Array.from(userContext.allRecords[i].fields.watched.split(","))
        );
        userContext.setNotInterested(
          Array.from(userContext.allRecords[i].fields.notInterested.split(","))
        );

        userContext.setToWatch(
          Array.from(userContext.allRecords[i].fields.toWatch.split(","))
        );

        console.log("Login Successful");
        setUserLogin(true);
      }
    }

    setUserAlert(true);
  };

  const handleLogIn = () => {
    if (userContext.isFetchDone) {
      retrieveUserData();
    }
  };

  const handleCreate = () => {
    userContext.setIsFetchDone(false);
    console.log(userContext.isFetchDone);
    setShowNewUserModal(true);
  };

  return (
    <>
      {!userLogin && (
        <div>
          <h1>Some Logo</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={userContext.username}
              type="text"
              placeholder="Enter your username"
              onChange={(event) => {
                userContext.setUsername(event.target.value);
                setUserAlert(false);
              }}
            ></input>
          </div>

          {userAlert && (
            <div>
              <h3>User does not exist.</h3>
            </div>
          )}

          <button onClick={handleLogIn}>LOGIN</button>
          <a href="#" onClick={() => handleCreate()}>
            Alternatively, create a new account.
          </a>

          {showNewUserModal && (
            <NewUserModal
              username={userContext.username}
              setUsername={userContext.setUsername}
              isFetchDone={userContext.isFetchDone}
              setIsFetchDone={userContext.isFetchDone}
              setShowNewUserModal={setShowNewUserModal}
              getAllRecords={getAllRecords}
              retrieveUserData={retrieveUserData}
            ></NewUserModal>
          )}
        </div>
      )}
      {userLogin && userContext.isFetchDone && (
        <>
          {/* <div>{userContext.username}</div>
          <div>{userContext.recordId}</div>
          <div>{userContext.watched}</div>
          <div>{userContext.notInterested}</div>
          <div>{userContext.toWatch}</div> */}
          <Navigate to="/discover" replace={true} />
        </>
      )}
    </>
  );
};

export default LoginPage;
