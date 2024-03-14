import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const OverLay = (props) => {
  const usernameRef = useRef();

  const createUser = async () => {
    const newUsername = usernameRef.current.value;

    if (newUsername.length >= 1 && newUsername.length <= 20) {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              username: usernameRef.current.value,
              watched: "[]",
              notInterested: "[]",
              toWatch: "[]",
            },
          }),
        };

        const response = await fetch(
          import.meta.env.VITE_AIRTABLE_SERVER,
          options
        );

        if (response.ok) {
          props.setUsername(usernameRef.current.value);
          props.getAllRecords();
          props.retrieveUserData();
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

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button onClick={() => props.setShowNewUserModal(false)}>Close</button>
        <div>
          <div>New Username</div>
          <input ref={usernameRef} type="text"></input>
          <button onClick={() => createUser()}>Create New User</button>
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
          setUsername={props.setUsername}
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
