import "./style.css";
import React from "react";
import NumberBoxDrag from "../NumberBox/NumberBoxDrag";
import PhysicalButton from "../PhysicalButton/PhysicalButton";
import LCDScreen from "../LCDScreen/LCDScreen.jsx";

function SequencerController(props) {
  // function startStrips(isOn) {
  //   console.log(isOn);
  //   console.log(props.strips);
  //   for (let x = 0; x < props.strips.length; x++) {
  //     if (isOn) {
  //       console.log("starting strip, index: " + x);
  //       props.strips[x].startMetronome();
  //     } else {
  //     }
  //   }
  // }
  function startMetro(isOn) {
    props.startMetronome(isOn);
  }

  return (
    <div className="sequencerController">
      <div className="labelFont sequencerTitle"> PolySynth </div>
      <div className="tempoControl">
        <NumberBoxDrag
          labelText="TEMPO"
          initialValue={120}
          upperLimit={260}
          lowerLimit={1}
          increment={0.5}
          preffix="bpm"
          decimalPlace={1}
        />
      </div>
      <div className="playControl">
        <PhysicalButton callback={startMetro} buttonText="Play" />
      </div>
      <div></div>
    </div>
  );
}

export default SequencerController;
