import "./style.css";
import React, { useState } from "react";
import Knob from "./Knob.jsx";

function RotaryKnob(props) {
  const [value, setValue] = useState(50);
  const [angle, setAngle] = useState(0); // Default angle, can be changed as needed

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const minAngle = -45; // Minimum rotation angle in degrees
  const maxAngle = 45; // Maximum rotation angle in degrees

  const handleMouseDown = (event) => {
    const startX = event.clientX;
    const startY = event.clientY;
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const newAngle = angle + deltaX;
      // Keep the rotation within the minAngle and maxAngle limits
      const clampedAngle = Math.min(Math.max(newAngle, minAngle), maxAngle);
      setAngle(clampedAngle);
      handleChange(
        Math.round(((angle - minAngle) / (maxAngle - minAngle)) * 100)
      );
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="rotaryKnob">
      <div className="rotaryKnobFrame">
        <div
          className="physicalKnob"
          onMouseDown={handleMouseDown}
          style={{ transform: `rotate(${angle}deg)` }}
        ></div>
        <div className="displayScreen"> {value} BPM </div>
      </div>
    </div>
  );
}

export default RotaryKnob;
