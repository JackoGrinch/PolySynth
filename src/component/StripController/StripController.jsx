import "./style.css";
import React, { useState } from "react";
import NumberBoxDrag from "../NumberBox/NumberBoxDrag";
import NumberBoxArrows from "../NumberBox/NumberBoxArrows";
import StripAudioControls from "../StripAudioControls/StripAudioControls";
import LCDScreen from "../LCDScreen/LCDScreen.jsx";
import FilePicker from "../../FilePicker/FilePicker";

function StripController(props) {
  const [sampleName, setSampleName] = useState("No Sample");

  function handleStripNameChange(e) {
    // console.log("call for change, value:" + e.target.value);
    props.updateStrip("name", e.target.value, props.Strip.id);
  }

  function handleSampleChange(File_Picker) {
    setSampleName(File_Picker.files[0].name);
  }

  return (
    <div className="stripController">
      <div>
        <input
          className="stripNameLabel"
          value={props.Strip.name}
          onChange={handleStripNameChange}
        />
      </div>
      <div className="controlRow">
        {/* <NumberBoxDrag
          labelText="TEMPO"
          initialValue={120}
          upperLimit={260}
          lowerLimit={1}
          increment={0.5}
          preffix="bpm"
          decimalPlace={1}
        /> */}
        <NumberBoxArrows
          labelText="STEPS"
          Value={props.numberOfSteps}
          upperLimit={13}
          lowerLimit={1}
          increment={1}
          preffix="steps"
          decimalPlace={0}
          valueChange={props.changeNumSteps}
        />
      </div>
      <div className="audioControl">
        <StripAudioControls />
      </div>
    </div>
  );
}

export default StripController;
