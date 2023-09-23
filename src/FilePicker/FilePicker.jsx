import React from "react";

function FilePicker(props) {
  return (
    <div>
      <label htmlFor="File-Picker"></label>
      <input style={{ display: "none" }} id="File-Picker" type="file"></input>
    </div>
  );
}

export default FilePicker;
