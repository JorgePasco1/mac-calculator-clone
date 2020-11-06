import React from "react";
import "./Button.css";

export default function Button({ name, type, handleClick }) {
  function childrenHandleClick() {
    const unable = ["+/-", "%"];
    if (unable.every((char) => !(char === name))) {
      handleClick(name);
    }
  }

  return (
    <button className={`Button ${type}`} onClick={childrenHandleClick}>
      {name}
    </button>
  );
}
