import React from "react";
import NavBar from "../components/NavBar";

const Recommended = (props) => {
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <p>{props.notInterested}</p>
      </div>
    </>
  );
};

export default Recommended;
