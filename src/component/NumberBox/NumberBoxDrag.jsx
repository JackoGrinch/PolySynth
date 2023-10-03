import React, { useState, useEffect } from "react";
import "./style.css";

//PROPS
// upperLimit, lowerLimit, increment, initialValue, preffix, decimalPlace, labelText

//upperLimit, lowerLimit
function NumberBoxDrag(props) {
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
          if (props.value !== props.lowerLimit)
            props.handleChange(props.identifier, props.value - props.increment);
        } else if (difference < 0) {
          if (props.value !== props.upperLimit)
            props.handleChange(props.identifier, props.value + props.increment);
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
  }, [dragging, dragStart]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart(e.clientY);
  };

  return (
    <div className="container">
      <div className="label"> {props.labelText} </div>
      <div className="numberBox">
        <div className="displayScreen" onMouseDown={handleMouseDown}>
          {props.value.toFixed(props.decimalPlace)}
          {props.suffix}
        </div>
      </div>
    </div>
  );
}

export default NumberBoxDrag;
