import React, { useEffect } from "react";
import "./style.css";

import SequencerStep from "../SequencerStep/SequencerStep";

function SequencerTrack(props) {
  return (
    <div id="my-component" className="sequencerTrack">
      {props.stepArray.map((step, index) => (
        <SequencerStep isOn={step.isOn} key={step.key} />
      ))}
    </div>
  );
}

export default SequencerTrack;
