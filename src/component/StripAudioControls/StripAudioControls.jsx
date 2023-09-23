import "./style.css";
import React from "react";
import PhysicalButton from "../PhysicalButton/PhysicalButton";

function StripAudioControls(props) {
  return (
    <div className="stripAudioControls">
      <PhysicalButton buttonText="🔇" />
    </div>
  );
}

export default StripAudioControls;
