import React, { useState } from "react";
import axios from "axios";

const LandingPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    props.setUser((prevState) => {
      return [...prevState, { username: username, password: password }];
    });

    // props.storeData(props.user);

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Some Logo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            type="text"
            placeholder="Enter your username"
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            id="password"
            value={password}
            type="text"
            placeholder="Enter your Password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LandingPage;
