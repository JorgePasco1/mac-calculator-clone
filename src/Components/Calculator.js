import React, { Component } from "react";
import Button from "./Button.js";
import "./Calculator.css";

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      accumulator: 0,
      lastOperation: "",
      currentInput: "",
      partialAcc: 0,
      currentOperation: "none",
      fontSize: 3.5,
      currentState: "input",
    };
  }

  handleNumberClick = (character) => {
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
      if (this.state.currentState === "input") {
        this.setState((prevState) => ({
          currentInput: prevState.currentInput + character,
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          currentInput: character,
          currentState: "input",
        }));
      }
    }
  };

  doCalculation = () => {
    const currentOp = this.state.currentOperation;
    if (currentOp === "multiplication" || currentOp === "division") {
      const partialResult =
        currentOp === "multiplication"
          ? this.state.partialAcc * this.state.currentInput
          : this.state.partialAcc / this.state.currentInput;
      this.setState((prevState) => ({
        ...prevState,
        partialAcc: partialResult,
        currentInput: partialResult,
      }));
    }
  };

  handleEquals = () => {
    this.doCalculation();
    this.setState((prevState) => ({
      ...prevState,
      accumulator: prevState.accumulator + prevState.partialAcc,
      currentInput: prevState.accumulator + prevState.partialAcc,
      accumulator: 0,
      partialAcc: 0,
      currentOperation: "none",
    }));
  };

  clearInput = (name) => {
    if (name === "AC") {
      this.setState((prevState) => ({
        accumulator: 0,
        partialAcc: 0,
        lastOperation: "",
        currentInput: "",
        fontSize: 3.5,
        currentState: "input",
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        currentInput: "",
        fontSize: 3.5,
      }));
    }
  };

  handlePrimOperator = (operator) => {
    if (operator === "x" || operator === "÷") {
      this.setState((prevState) => ({
        ...prevState,
        partialAcc: prevState.accumulator || +prevState.currentInput,
        currentOperation: operator === "x" ? "multiplication" : "division",
        currentState: "newInput",
      }));
    }
    if (this.state.currentState === "input") {
      this.doCalculation();
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
        <Button type="number" name="." handleClick={this.showState} />
        <Button type="primOperator" name="=" handleClick={this.handleEquals} />
      </div>
    );
  }
}
