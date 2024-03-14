import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NewUserModal from "../components/NewUserModal";
import moviesContext from "../context/movies-context";

const LoginPage = () => {
  const userContext = useContext(moviesContext);
  const [username, setUsername] = useState("");
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
        userContext.setAllRecords(data.records);
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

  const retrieveUserData = (event) => {
    for (let i = 0; i < userContext.allRecords.length; i++) {
      if (username === userContext.allRecords[i].fields.username) {
        userContext.setRecordId(userContext.allRecords[i].id);
        userContext.setWatched(userContext.allRecords[i].fields.watched);
        userContext.setNotInterested(
          userContext.allRecords[i].fields.notInterested
        );
        userContext.setToWatch(userContext.allRecords[i].fields.toWatch);

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
              value={username}
              type="text"
              placeholder="Enter your username"
              onChange={(event) => {
                setUsername(event.target.value);
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
              setUsername={setUsername}
              setShowNewUserModal={setShowNewUserModal}
              getAllRecords={getAllRecords}
              retrieveUserData={retrieveUserData}
            ></NewUserModal>
          )}
        </div>
      )}

      {userLogin && <Navigate to="/discover" replace={true} />}
    </>
  );
};

export default LoginPage;
