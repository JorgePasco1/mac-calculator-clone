import React, { Component } from "react";
import Button from "./Button.js";
import "./Calculator.css";

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: 0,
    };
  }

  render() {
    return (
      <div className="Calculator">
        <div class="monitor">{this.state.display}</div>
        <Button type="secOperator" content="AC" />
        <Button type="secOperator" content="+/-" />
        <Button type="secOperator" content="%" />
        <Button type="primOperator" content="÷" />
        <Button type="number" content="7" />
        <Button type="number" content="8" />
        <Button type="number" content="9" />
        <Button type="primOperator" content="x" />
        <Button type="number" content="4" />
        <Button type="number" content="5" />
        <Button type="number" content="6" />
        <Button type="primOperator" content="-" />
        <Button type="number" content="1" />
        <Button type="number" content="2" />
        <Button type="number" content="3" />
        <Button type="primOperator" content="+" />
        <Button type="zeroNumber" content="0" />
        <Button type="number" content="." />
        <Button type="primOperator" content="=" />
      </div>
    );
  }
}
