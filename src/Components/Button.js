import React from "react";
import "./Button.css";

export const Button = ({ type, content }) => {
  return <div className={`Button ${type}`}>{content}</div>;
};
