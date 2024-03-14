import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NewUserModal from "../components/NewUserModal";
import moviesContext from "../context/movies-context";

const LoginPage = () => {
  const userContext = useContext(moviesContext);
  const [userAlert, setUserAlert] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);

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
    for (let i = 0; i < userContext.allRecords.length; i++) {
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

          <button onClick={retrieveUserData}>LOGIN</button>
          <a href="#" onClick={() => setShowNewUserModal(true)}>
            Alternatively, create a new account.
          </a>

          {showNewUserModal && (
            <NewUserModal
              setUsername={userContext.setUsername}
              setShowNewUserModal={setShowNewUserModal}
              getAllRecords={getAllRecords}
              retrieveUserData={retrieveUserData}
            ></NewUserModal>
          )}
        </div>
      )}
      {userLogin && (
        <>
          {/* <div>{userContext.recordId}</div>
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
