import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./UserModal.module.css";

const OverLay = (props) => {
  const [isUserCreated, setIsUserCreated] = useState(false);

  const createUser = async () => {
    if (props.username.length >= 1 && props.username.length <= 20) {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              username: props.username,
              watched: ",",
              notInterested: ",",
              toWatch: ",",
            },
          }),
        };

        const response = await fetch(
          import.meta.env.VITE_AIRTABLE_SERVER,
          options
        );

        if (response.ok) {
          props.getAllRecords();
          setIsUserCreated(true);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      }
    } else {
      console.log("Username has to be 1-20 characters long.");
    }
  };

  const handleCreate = (event) => {
    createUser();
    // if (props.isFetchDone && isUserCreated) {
    //   console.log("Retrieving...");
    //   props.retrieveUserData();
    // }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button onClick={() => props.setShowNewUserModal(false)}>Close</button>
        <div>
          <div>New Username</div>
          <input
            value={props.username}
            type="text"
            onChange={(event) => {
              props.setUsername(event.target.value);
            }}
          ></input>
          <button onClick={() => handleCreate()} disabled={isUserCreated}>
            Create New User
          </button>
          {isUserCreated && (
            <div>
              User has been created. Please close this page to Login with your
              new username.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NewUserModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          username={props.username}
          setUsername={props.setUsername}
          isFetchDone={props.isFetchDone}
          setShowNewUserModal={props.setShowNewUserModal}
          getAllRecords={props.getAllRecords}
          retrieveUserData={props.retrieveUserData}
        ></OverLay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default NewUserModal;
