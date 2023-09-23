import React from "react";
import "./style.css";

function PopUpMenu(props) {
  return (
    <div className="popUpMenu">
      <div className="drop-down">
        {props.options.map((option, index) => (
          <div key={index} className="menuItem" onClick={option.callback}>
            {" "}
            {option.name}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopUpMenu;
