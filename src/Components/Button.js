import React from "react";
import "./Button.css";

const Button = ({ type, content }) => {
  return <button className={`Button ${type}`}>{content}</button>;
};

export default Button;
