import React, { useState, useEffect } from "react";
import "./style.css";

//upperLimit, lowerLimit
function NumberBoxDrag(props) {
  const [number, setNumber] = useState(props.initialValue);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false);
    };

    const handleMouseMove = (e) => {
      if (dragging) {
        const dragEnd = e.clientY;
        const difference = dragEnd - dragStart;

        if (difference > 0) {
          if (number !== props.lowerLimit) setNumber(number - props.increment);
        } else if (difference < 0) {
          if (number !== props.upperLimit) setNumber(number + props.increment);
        }

        setDragStart(dragEnd);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging, dragStart, number]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart(e.clientY);
  };

  return (
    <div className="container">
      <div className="label"> {props.labelText} </div>
      <div className="numberBox">
        <div className="displayScreen" onMouseDown={handleMouseDown}>
          {number.toFixed(props.decimalPlace)}
          {props.suffix}
        </div>
      </div>
    </div>
  );
}

export default NumberBoxDrag;
