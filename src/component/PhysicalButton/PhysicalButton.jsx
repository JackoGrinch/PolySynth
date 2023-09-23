import React, { useState } from "react";
import "./style.css";

function PhysicalButton(props) {
  const [style, setStyle] = useState("buttonSurface labelFont unclicked");
  const [ondicator, setOndicator] = useState(
    "buttonOndicator buttonOndicatorOff"
  );
  let isOn = false;

  function handleMouseDown() {
    if (style === "buttonSurface labelFont unclicked") {
      setStyle("buttonSurface labelFont clicked");
      setOndicator("buttonOndicator buttonOndicatorOn");
      isOn = true;
    } else {
      setStyle("buttonSurface labelFont unclicked");
      setOndicator("buttonOndicator buttonOndicatorOff");
      isOn = false;
    }
    console.log(isOn);
    props.callback(isOn);
  }

  function handleMouseUp() {
    if (props.notSticky || false) {
      setStyle("buttonSurface labelFont unclicked");
      setOndicator("buttonOndicator buttonOndicatorOff");
      isOn = false;
      console.log(isOn);
      props.callback(isOn);
    }
  }

  return (
    <div className="buttonContainer">
      <div
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        className={style}
      >
        {props.buttonText}
      </div>
      <div className={ondicator}> </div>
    </div>
  );
}

export default PhysicalButton;
