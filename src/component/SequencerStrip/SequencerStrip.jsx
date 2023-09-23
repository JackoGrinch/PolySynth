import React, { useState, useEffect } from "react";
import SequencerTrack from "../SequencerTrack/SequencerTrack";
import StripController from "../StripController/StripController";
import "./style.css";
import PopUpMenu from "../../PopUpMenu/PopUpMenu";

function SequencerStrip(props) {
  const menuOffStyle = { display: "none" };
  const [popUpMenuStyle, setPopUpMenuStyle] = useState(menuOffStyle);
  const [numberOfSteps, setNumberOfSteps] = useState(props.numSteps);
  const [stepArray, updateStepArray] = useState([
    { key: 0, isOn: "triggerIndicator triggerIndicatorOff" },
    { key: 1, isOn: "triggerIndicator triggerIndicatorOff" },
    { key: 2, isOn: "triggerIndicator triggerIndicatorOff" },
    { key: 3, isOn: "triggerIndicator triggerIndicatorOff" },
    { key: 4, isOn: "triggerIndicator triggerIndicatorOff" },
    { key: 5, isOn: "triggerIndicator triggerIndicatorOff" },
    { key: 6, isOn: "triggerIndicator triggerIndicatorOff" },
    { key: 7, isOn: "triggerIndicator triggerIndicatorOff" }
  ]);

  /////////////////////METRONOME MANAGEMENT///////////////////////////
  useEffect(() => {
    //INITIALISE THE CALLBACK FUNCTION FOR THIS METRONOME TO
    //APPLY TO THIS SPECIFIC STRIP
    props.metro.setCallback(OnBeat);
  });

  //THE CALLBACK FUNCTION FOR EACH BANG OF THE METRONOME ON THIS STRIP
  let stepNumber = 0;
  function OnBeat() {
    //CALCULATE THE STEPNUMBER BY COUNTING AND MOD
    stepNumber++;
    stepNumber = stepNumber % numberOfSteps;

    //CREATE A NEW ARRAY FOR THE STEPS WHICH HOLDS THE STATE OF WHICH STEP IS ON OR OFF
    //COULD EACH STEP BE HANDLED INDEPENDANTLY SO NOT EVER STEP IS RERENDERED EVERY BEAT?
    let newSteps = [];
    stepArray.forEach((step) => {
      let isOn;
      if (stepNumber === step.key) isOn = "triggerIndicator triggerIndicatorOn";
      else isOn = "triggerIndicator triggerIndicatorOff";
      newSteps.push({ key: 0, isOn: isOn });
    });
    updateStepArray(newSteps);
  }
  /////////////////////CONTEXT MENU///////////////////////
  function handleMenuOpen(e) {
    e.preventDefault();
    const menuOnStyle = {
      position: "absolute",
      display: "block",
      left: e.clientX,
      top: e.clientY
    };
    setPopUpMenuStyle(menuOnStyle);
  }
  function handleMenuOff() {
    setPopUpMenuStyle(menuOffStyle);
  }
  //ARRAY OF CONTEXT MENU OPTIONS WITH TEXT, CALLBACK PAIRS
  const StripMenuOptions = [
    {
      name: "Delete Strip",
      callback: removeStrip
    }
  ];

  ///////////////////////STEP MANAGEMENT////////////////////////////
  function handleChangeOfSteps(x) {
    console.log("STEP CHANGE: " + x);
    console.log(stepArray);
    //Check not lower than 0
    if (x !== 0) {
      //If increasing the number of Steps
      if (x > numberOfSteps) {
        const newStep = numberOfSteps + 1;
        updateStepArray((prevSteps) => [
          ...stepArray,
          { key: newStep, value: null }
        ]);
      }
      //if decreasing the number of steps
      if (x < numberOfSteps) {
        const newStep = numberOfSteps - 1;
        setNumberOfSteps(x);
        updateStepArray((prevSequenceSteps) =>
          prevSequenceSteps.filter((_, index) => index < newStep)
        );
      }
      setNumberOfSteps(x);
      //props.audio.updateStripLength(props.ID, x);
      console.log("STEPS " + numberOfSteps);
    }
  }
  const updateStep = (id, value) => {
    updateStepArray((prevSequenceSteps) =>
      prevSequenceSteps.map((step) =>
        step.id === id ? { ...step, value } : step
      )
    );
  };

  ///////////////////////STRIP MANAGEMENT//////////////////////////
  function removeStrip() {
    props.removeStrip(props.id);
  }

  return (
    <div onContextMenu={(e) => handleMenuOpen(e)} className="sequencerStrip">
      <StripController
        stripName={props.name}
        metronome={props.metro}
        numberOfSteps={numberOfSteps}
        changeNumSteps={handleChangeOfSteps}
      />
      <SequencerTrack stepArray={stepArray} numberOfSteps={numberOfSteps} />
      <div style={popUpMenuStyle} onMouseLeave={handleMenuOff}>
        <PopUpMenu options={StripMenuOptions} />
      </div>
    </div>
  );
}

export default SequencerStrip;
