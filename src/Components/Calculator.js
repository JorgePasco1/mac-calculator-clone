import React, { Component } from "react";
import Button from "./Button.js";
import "./Calculator.css";

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      accumulator: 0,
      currentInput: "",
      fontSize: 3.5,
      currentOperation: "input",
    };
  }

  handleClick = (character) => {
    const currentInputLenght = this.state.currentInput.length;
    if (currentInputLenght >= 8 && currentInputLenght <= 13) {
      this.setState((prevState) => ({
        ...prevState,
        fontSize: prevState.fontSize - 0.3,
      }));
    }

    if (currentInputLenght > 15) {
      this.setState((prevState) => ({ ...prevState }));
    } else {
      if (this.state.currentOperation === "input") {
        this.setState((prevState) => ({
          currentInput: prevState.currentInput + character,
        }));
      } else {
        this.setState((prevState) => ({
          currentInput: character,
          currentOperation: "input",
        }));
      }
    }
  };

  clearInput = (name) => {
    if (name === "AC") {
      this.setState((prevState) => ({
        ...prevState,
        accumulator: 0,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        currentInput: "",
        fontSize: 3.5,
      }));
    }
  };

  handleOperator = (operator) => {
    if (this.state.currentOperation === "input") {
      let currentOperation;
      let newAccumulator;
      if (operator === "+") {
        currentOperation = "sum";
        newAccumulator = this.state.accumulator + +this.state.currentInput;
      }
      this.setState((prevState) => ({
        ...prevState,
        currentOperation: currentOperation,
        accumulator: newAccumulator,
        currentInput: newAccumulator,
      }));
    }
  };

  handleEquals = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="Calculator">
        <div
          className="monitor"
          style={{ fontSize: `${this.state.fontSize}rem` }}
        >
          {this.state.currentInput || 0}
        </div>
        <Button
          type="secOperator"
          name={this.state.currentInput ? "C" : "AC"}
          handleClick={this.clearInput}
        />
        <Button type="secOperator" name="+/-" handleClick={this.handleClick} />
        <Button type="secOperator" name="%" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          name="÷"
          handleClick={this.handleOperator}
        />
        <Button type="number" name="7" handleClick={this.handleClick} />
        <Button type="number" name="8" handleClick={this.handleClick} />
        <Button type="number" name="9" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          name="x"
          handleClick={this.handleOperator}
        />
        <Button type="number" name="4" handleClick={this.handleClick} />
        <Button type="number" name="5" handleClick={this.handleClick} />
        <Button type="number" name="6" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          name="-"
          handleClick={this.handleOperator}
        />
        <Button type="number" name="1" handleClick={this.handleClick} />
        <Button type="number" name="2" handleClick={this.handleClick} />
        <Button type="number" name="3" handleClick={this.handleClick} />
        <Button
          type="primOperator"
          name="+"
          handleClick={this.handleOperator}
        />
        <Button type="zeroNumber" name="0" handleClick={this.handleClick} />
        <Button type="number" name="." handleClick={this.handleClick} />
        <Button type="primOperator" name="=" handleClick={this.handleEquals} />
      </div>
    );
  }
}
