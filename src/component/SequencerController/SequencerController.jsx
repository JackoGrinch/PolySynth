import "./style.css";
import React from "react";
import NumberBoxDrag from "../NumberBox/NumberBoxDrag";
import PhysicalButton from "../PhysicalButton/PhysicalButton";
import LCDScreen from "../LCDScreen/LCDScreen.jsx";
import SampleControls from "../../SampleControls/SampleControls";
function SequencerController(props) {
  function startMetro(isOn) {
    props.startMetronome(isOn);
  }

  return (
    <div className="sequencerController">
      <div className="labelFont sequencerTitle"> PolySynth </div>
      <div className="globalControlsContainer labelFont">
        <div className="globalControlLabel"> GLOBAL------------------- </div>
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
      </div>
      <div className="sampleControlsContainer">
        <SampleControls selectedStrip={props.selectedStrip} />
      </div>
    </div>
  );
}

export default SequencerController;
