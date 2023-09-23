import React, { useState } from "react";

function NumberBoxArrows(props) {
  function increaseNumber() {
    let newNumber = props.Value + props.increment;
    if (newNumber > props.upperLimit) {
      newNumber = props.upperLimit;
    }
    props.valueChange(newNumber);
  }
  function decreaseNumber() {
    let newNumber = props.Value - props.increment;
    if (newNumber < props.lowerLimit) {
      newNumber = props.lowerLimit;
    }
    props.valueChange(newNumber);
  }

  return (
    <div className="container">
      <div className="label"> {props.labelText} </div>
      <div className="numberBox">
        <div className="displayScreen">
          <div className="leftArrow" onClick={decreaseNumber}>
            {" "}
            ◄{" "}
          </div>
          <div className="number">
            {props.Value.toFixed(props.decimalPlace)}
            {props.suffix}
          </div>
          <div className="rightArrow" onClick={increaseNumber}>
            {" "}
            ►{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberBoxArrows;
