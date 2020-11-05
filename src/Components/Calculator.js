import React, { useState } from "react";
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

export default function Calculator() {
  const [state, setState] = useState(initialState);
  const calculateFontSize = () => {
    if (state.currentState !== "input") {
      setState((prevState) => ({
        ...prevState,
        fontSize: initialState.fontSize,
      }));
    }
    const currentInputLenght = state.currentInput.length;
    if (currentInputLenght >= 8 && currentInputLenght <= 13) {
      setState((prevState) => ({
        ...prevState,
        fontSize: prevState.fontSize - 0.3,
      }));
    }
  };
  const handleNumberClick = (character) => {
    calculateFontSize();
    if (state.currentInput.length > 15) {
      setState((prevState) => ({ ...prevState }));
    } else {
      if (state.currentState === "input") {
        setState((prevState) => ({
          ...prevState,
          currentInput: prevState.currentInput + character,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          currentOperation: "none",
          currentInput: character,
          currentState: "input",
        }));
      }
    }
  };
  const doCalculation = (operator) => {
    if (operator === "x" || operator === "÷") {
      const partialResult =
        operator === "x"
          ? state.partialAcc * state.currentInput
          : state.partialAcc / state.currentInput;
      setState((prevState) => ({
        ...prevState,
        partialAcc:
          prevState.previousOperation === "-" ? -partialResult : partialResult,
        currentInput: partialResult,
        currentState: "newResult",
        previousOperation: operator,
      }));
    } else {
      setState((prevState) => ({
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
  const handleEquals = () => {
    doCalculation(state.previousOperation);

    setState((prevState) => ({
      ...prevState,
      // accumulator:
      //   prevState.accumulator +
      //   (prevState.previousOperation === "x" ||
      //   prevState.previousOperation === "÷"
      //     ? prevState.partialAcc
      //     : 0),
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
  const clearInput = (name) => {
    if (name === "AC") {
      setState(initialState);
    } else {
      setState((prevState) => ({
        ...prevState,
        currentInput: "",
        fontSize: 3.5,
      }));
    }
  };
  const handlePrimOperator = (operator) => {
    if (state.previousOperation === "x" || state.previousOperation === "÷") {
      handleEquals();
    }
    setState((prevState) => ({
      ...prevState,
      currentOperation: operator,
      currentState: "newInput",
    }));

    if (state.currentState === "input" || state.currentState === "newResult") {
      doCalculation(operator);
    }
  };
  return (
    <div className="Calculator">
      <div className="monitor" style={{ fontSize: `${state.fontSize}rem` }}>
        {state.currentInput || 0}
      </div>
      <Button
        type="secOperator"
        name={state.currentInput ? "C" : "AC"}
        handleClick={clearInput}
      />
      <Button type="secOperator" name="+/-" handleClick={"handleClick"} />
      <Button type="secOperator" name="%" handleClick={"handleClick"} />
      <Button type="primOperator" name="÷" handleClick={handlePrimOperator} />
      <Button type="number" name="7" handleClick={handleNumberClick} />
      <Button type="number" name="8" handleClick={handleNumberClick} />
      <Button type="number" name="9" handleClick={handleNumberClick} />
      <Button type="primOperator" name="x" handleClick={handlePrimOperator} />
      <Button type="number" name="4" handleClick={handleNumberClick} />
      <Button type="number" name="5" handleClick={handleNumberClick} />
      <Button type="number" name="6" handleClick={handleNumberClick} />
      <Button type="primOperator" name="-" handleClick={handlePrimOperator} />
      <Button type="number" name="1" handleClick={handleNumberClick} />
      <Button type="number" name="2" handleClick={handleNumberClick} />
      <Button type="number" name="3" handleClick={handleNumberClick} />
      <Button type="primOperator" name="+" handleClick={handlePrimOperator} />
      <Button type="zeroNumber" name="0" handleClick={handleNumberClick} />
      <Button type="number" name="." handleClick={handleNumberClick} />
      <Button type="primOperator" name="=" handleClick={handleEquals} />
    </div>
  );
}
