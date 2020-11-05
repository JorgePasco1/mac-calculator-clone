import React, { Component } from "react";
import Button from "./Button.js";
import "./Calculator.css";

const initialState = {
  accumulator: 0,
  currentInput: "",
  partialAcc: 1,
  currentOperation: "none",
  currentState: "input",
  fontSize: 3.5,
  previousOperation: "none",
};

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFontSize = () => {
    if (this.state.currentState != "input") {
      this.setState((prevState) => ({
        ...prevState,
        fontSize: initialState.fontSize,
      }));
    }
    const currentInputLenght = this.state.currentInput.length;
    if (currentInputLenght >= 8 && currentInputLenght <= 13) {
      this.setState((prevState) => ({
        ...prevState,
        fontSize: prevState.fontSize - 0.3,
      }));
    }
  };

  handleNumberClick = (character) => {
    this.calculateFontSize();
    if (this.state.currentInput.length > 15) {
      this.setState((prevState) => ({ ...prevState }));
    } else {
      if (this.state.currentState === "input") {
        this.setState((prevState) => ({
          currentInput: prevState.currentInput + character,
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          currentOperation: "none",
          currentInput: character,
          currentState: "input",
        }));
      }
    }
  };

  doCalculation = (operator) => {
    if (operator === "x" || operator === "÷") {
      const partialResult =
        operator === "x"
          ? this.state.partialAcc * this.state.currentInput
          : this.state.partialAcc / this.state.currentInput;
      this.setState((prevState) => ({
        ...prevState,
        partialAcc:
          prevState.previousOperation === "-" ? -partialResult : partialResult,
        currentInput: partialResult,
        currentState: "newResult",
        previousOperation: operator,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        accumulator:
          prevState.accumulator +
          (prevState.previousOperation === "-"
            ? -prevState.currentInput
            : +prevState.currentInput),
        currentInput:
          prevState.accumulator +
          (prevState.previousOperation === "-"
            ? -prevState.currentInput
            : +prevState.currentInput),
        currentState: "newResult",
        previousOperation: operator,
      }));
    }
  };

  handleEquals = () => {
    this.doCalculation(this.state.previousOperation);

    this.setState((prevState) => ({
      ...prevState,
      accumulator:
        prevState.accumulator +
        (prevState.previousOperation === "x" ||
        prevState.previousOperation === "÷"
          ? prevState.partialAcc
          : 0),
      currentInput:
        prevState.accumulator +
        (prevState.previousOperation === "x" ||
        prevState.previousOperation === "÷"
          ? prevState.partialAcc
          : 0),
      accumulator: 0,
      partialAcc: 1,
      currentOperation: "none",
      previousOperation: "none",
    }));
  };

  clearInput = (name) => {
    if (name === "AC") {
      this.setState(initialState);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        currentInput: "",
        fontSize: 3.5,
      }));
    }
  };

  handlePrimOperator = (operator) => {
    if (
      this.state.previousOperation === "x" ||
      this.state.previousOperation === "÷"
    ) {
      this.handleEquals();
    }
    this.setState((prevState) => ({
      ...prevState,
      currentOperation: operator,
      currentState: "newInput",
    }));

    if (
      this.state.currentState === "input" ||
      this.state.currentState === "newResult"
    ) {
      this.doCalculation(operator);
    }
  };

  showState = () => {
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
          handleClick={this.handlePrimOperator}
        />
        <Button type="number" name="7" handleClick={this.handleNumberClick} />
        <Button type="number" name="8" handleClick={this.handleNumberClick} />
        <Button type="number" name="9" handleClick={this.handleNumberClick} />
        <Button
          type="primOperator"
          name="x"
          handleClick={this.handlePrimOperator}
        />
        <Button type="number" name="4" handleClick={this.handleNumberClick} />
        <Button type="number" name="5" handleClick={this.handleNumberClick} />
        <Button type="number" name="6" handleClick={this.handleNumberClick} />
        <Button
          type="primOperator"
          name="-"
          handleClick={this.handlePrimOperator}
        />
        <Button type="number" name="1" handleClick={this.handleNumberClick} />
        <Button type="number" name="2" handleClick={this.handleNumberClick} />
        <Button type="number" name="3" handleClick={this.handleNumberClick} />
        <Button
          type="primOperator"
          name="+"
          handleClick={this.handlePrimOperator}
        />
        <Button
          type="zeroNumber"
          name="0"
          handleClick={this.handleNumberClick}
        />
        <Button type="number" name="." handleClick={this.handleNumberClick} />
        <Button type="primOperator" name="=" handleClick={this.handleEquals} />
      </div>
    );
  }
}
