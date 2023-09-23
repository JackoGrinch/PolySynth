import React, { useState, useRef } from "react";
import "./style.css"; // You can create a CSS file for custom styling

const RotaryKnob = () => {
  const [value, setValue] = useState(50); // Default value, can be changed as needed
  const minAngle = -180; // Minimum rotation angle in degrees
  const maxAngle = 45; // Maximum rotation angle in degrees
  const knobRef = useRef(null);

  const handleMouseDown = (event) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const knobRect = knobRef.current.getBoundingClientRect();
    const knobCenterX = knobRect.left + knobRect.width / 2;
    const knobCenterY = knobRect.top + knobRect.height / 2;
    const angle =
      Math.atan2(event.clientY - knobCenterY, event.clientX - knobCenterX) *
      (180 / Math.PI);

    // Ensure the knob remains within its limits
    const clampedAngle = Math.min(Math.max(angle, minAngle), maxAngle);

    // Calculate the corresponding value based on the angle within the limits
    const range = maxAngle - minAngle;
    const value = ((clampedAngle - minAngle) / range) * 100;
    setValue(value);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="rotary-knob" onMouseDown={handleMouseDown} ref={knobRef}>
      <div
        className="knob"
        style={{
          transform: `rotate(${
            (value / 100) * (maxAngle - minAngle) + minAngle
          }deg)`
        }}
      ></div>
      <div>Value: {Math.round(value)}</div>
    </div>
  );
};

export default RotaryKnob;
