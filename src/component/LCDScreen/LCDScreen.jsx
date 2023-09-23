import React from "react";
import "./style.css";

function LCDScreen(props) {
  //const filePicker = document.getElementById("File-Picker");

  function UpdateFile(e) {
    const File_Picker = e.target;
    //console.log(File_Picker.files[0].name);
    props.callback(File_Picker);
  }

  return (
    <div className="screenContainer">
      <div className="LCDScreen">
        <div className="screenBackground screenText"> {props.screenText} </div>
      </div>
      <label htmlFor="File-Picker" className="loadSampleBox">
        {" "}
        ...{" "}
      </label>
      <input
        onChange={UpdateFile}
        style={{ display: "none" }}
        accept=".Wav, .mp3"
        id="File-Picker"
        type="file"
      ></input>
    </div>
  );
}

export default LCDScreen;
