import React, { Component } from "react";
import "./Button.css";

// { type, content, handleClick }
class Button extends Component {
  childrenHandleClick = () => {
    this.props.handleClick(this.props.content)
  }

  render() {
    return (
      <button className={`Button ${this.props.type}`} onClick={this.childrenHandleClick}>
        {this.props.content}
      </button>
    );
  }
}

export default Button;
