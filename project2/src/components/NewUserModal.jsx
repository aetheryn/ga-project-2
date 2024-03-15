import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./UserModal.module.css";
import icon from "../../../icon.png";

const OverLay = (props) => {
  const [isInputValid, setIsInputValid] = useState(true);
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
      setIsInputValid(false);
    }
  };

  const handleCreate = (event) => {
    setIsInputValid(true);
    createUser();
    // if (props.isFetchDone && isUserCreated) {
    //   console.log("Retrieving...");
    //   props.retrieveUserData();
    // }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div>
          <button
            className={styles.cancel}
            onClick={() => props.setShowNewUserModal(false)}
            style={{ float: "right" }}
          >
            &#x2715;
          </button>
        </div>

        <div className="centered">
          <img className={styles.icon} src={icon}></img>
        </div>

        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 centered">
            <input
              value={props.username}
              placeholder="Enter New Username"
              type="text"
              onChange={(event) => {
                props.setUsername(event.target.value);
              }}
            ></input>

            <br />

            <button
              onClick={() => handleCreate()}
              disabled={isUserCreated}
              className={styles.button}
            >
              CREATE NEW USER
            </button>

            <br />

            {!isInputValid && (
              <>
                <div style={{ color: "white", fontSize: "small" }}>
                  Username has to be 1-20 characters long.
                </div>
                <br />
              </>
            )}

            {isUserCreated && (
              <>
                <div style={{ color: "white", fontSize: "small" }}>
                  User created. Close this page to login with your new username.
                </div>
                <br />
              </>
            )}
          </div>
          <div className="col-3"></div>
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
