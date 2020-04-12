import React, { Component } from "react";
import Button from "./Button.js";
import "./Calculator.css";

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      fontSize: 3.5,
    };
  }

  handleClick = (character) => {
    const currentInputLenght = this.state.input.length;
    if (currentInputLenght >= 8 && currentInputLenght <= 13) {
      this.setState((prevState) => ({
        ...prevState,
        fontSize: prevState.fontSize - 0.3,
      }));
    }

    if (currentInputLenght > 15) {
      this.setState((prevState) => ({ ...prevState }));
    } else {
      this.setState((prevState) => ({
        input: prevState.input + character,
      }));
    }
  };

  clearInput = () => {
    this.setState({ input: "", fontSize: 3.5 });
  };

  render() {
    return (
      <div className="Calculator">
        <div
          className="monitor"
          style={{ fontSize: `${this.state.fontSize}rem` }}
        >
          {this.state.input || 0}
        </div>
        <Button
          type="secOperator"
          content={this.state.input ? "C" : "AC"}
          handleClick={this.clearInput}
        />
        <Button
          type="secOperator"
          content="+/-"
          handleClick={this.handleClick}
        />
        <Button type="secOperator" content="%" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          content="÷"
          handleClick={this.handleClick}
        />
        <Button type="number" content="7" handleClick={this.handleClick} />
        <Button type="number" content="8" handleClick={this.handleClick} />
        <Button type="number" content="9" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          content="x"
          handleClick={this.handleClick}
        />
        <Button type="number" content="4" handleClick={this.handleClick} />
        <Button type="number" content="5" handleClick={this.handleClick} />
        <Button type="number" content="6" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          content="-"
          handleClick={this.handleClick}
        />
        <Button type="number" content="1" handleClick={this.handleClick} />
        <Button type="number" content="2" handleClick={this.handleClick} />
        <Button type="number" content="3" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          content="+"
          handleClick={this.handleClick}
        />
        <Button type="zeroNumber" content="0" handleClick={this.handleClick} />
        <Button type="number" content="." handleClick={this.handleClick} />
        <Button
          type="primOperator"
          content="="
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}
