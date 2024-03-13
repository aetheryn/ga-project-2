import React, { useState } from "react";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [userAlert, setUserAlert] = useState(false);
  const [userLogin, setUserLogin] = useState(false);

  const getUserData = async (signal) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
        },
        signal,
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

  const handleClick = () => {
    const controller = new AbortController();
    getUserData(controller.signal);

    for (let i = 0; i < props.allRecords.length; i++) {
      if (username === props.allRecords[i].fields.username) {
        props.setRecordId(props.allRecords[i].id);
        props.setWatched(
          Array.from(props.allRecords[i].fields.watched.split(","))
        );
        props.setNotInterested(
          Array.from(props.allRecords[i].fields.notInterested.split(","))
        );
        props.setToWatch(
          Array.from(props.allRecords[i].fields.toWatch.split(","))
        );

        setUserAlert(false);
        setUserLogin(true);
      }
    }

    return () => {
      controller.abort();
    };
  };

  return (
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

      <button onClick={handleClick}>LOGIN</button>
    </div>
  );
};

export default LoginPage;
