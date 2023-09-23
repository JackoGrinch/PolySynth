import React, { useState, useEffect } from "react";
import "./style.css";

function SequencerStep(props) {
  const [OffOn, setOffOn] = useState("ondicator ondicatorOff");
  const [sequencerStepBoxStyle, setSequencerStepBoxStyle] = useState(
    "sequencerStepBox shadow"
  );
  // const [Trigger, setTrigger] = useState(
  //   "triggerIndicator triggerIndicatorOff"
  // );
  useEffect(() => {
    console.log(props.isOn);
  });
  function HandleClick() {
    console.log("Click");
    if (OffOn === "ondicator ondicatorOff") {
      setOffOn("ondicator ondicatorOn");
      setSequencerStepBoxStyle("sequencerStepBox");
      // TriggerStep();
    } else {
      setOffOn("ondicator ondicatorOff");
      setSequencerStepBoxStyle("sequencerStepBox shadow");
    }
  }

  // function TriggerStep() {
  //   setTrigger("triggerIndicator triggerIndicatorOn");
  //   setTimeout(() => {
  //     setTrigger("triggerIndicator triggerIndicatorOff");
  //   }, 100);
  // }

  return (
    <div onClick={HandleClick} className="sequencerStep">
      <div className={sequencerStepBoxStyle}>
        <div className={props.isOn}></div>
        <div className={OffOn}> </div>
      </div>
    </div>
  );
}

export default SequencerStep;
