import React from "react";
import NavBar from "../components/NavBar";

const ToWatch = (props) => {
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="main">
        <p>{props.toWatch}</p>
      </div>
    </>
  );
};

export default ToWatch;
