import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NewUserModal from "../components/NewUserModal";

const LoginPage = (props) => {
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
        props.setAllRecords(data.records);
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
    for (let i = 0; i < props.allRecords.length; i++) {
      if (username === props.allRecords[i].fields.username) {
        props.setRecordId(props.allRecords[i].id);
        props.setWatched(props.allRecords[i].fields.watched);
        props.setNotInterested(props.allRecords[i].fields.notInterested);
        props.setToWatch(props.allRecords[i].fields.toWatch);

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
          {userLogin && (
            <div>
              <h3>User successfully logged in.</h3>
              <p>{props.id}</p>
              <p>{username}</p>
              <p>{props.watched}</p>
              <p>{props.notInterested}</p>
              <p>{props.toWatch}</p>
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
