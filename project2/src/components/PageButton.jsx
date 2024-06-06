import React from "react";

const PageButton = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};

export default PageButton;
