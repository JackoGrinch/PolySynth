import React from "react";
import "./style.css";
import NumberBoxDrag from "../component/NumberBox/NumberBoxDrag";
import LCDScreen from "../component/LCDScreen/LCDScreen";
function SampleControls(props) {
  function UpdateSample() {}

  return (
    <div>
      <div className="sampleControlsLabel labelFont">
        SAMPLE CONTROL----------------------------
      </div>
      <div className="sampleControlTop">
        <div className="selectedStripContainer">{props.selectedStrip.name}</div>
        <div className="filterContainer">
          <div className="labelFont filterLabel">
            FILTER--------------------
          </div>
          <div className="sampleControlFilter">
            <div className="sampleNBSlider sampleFilterFreqContainer">
              <NumberBoxDrag
                initialValue={1}
                increment={0.01}
                lowerLimit={0.1}
                upperLimit={5}
                labelText="Freq"
                decimalPlace="2"
              />
            </div>
            <div className="sampleNBSlider sampleFilterResContainer">
              <NumberBoxDrag
                initialValue={1}
                increment={0.01}
                lowerLimit={0.1}
                upperLimit={5}
                labelText="Res"
                decimalPlace="2"
              />
            </div>
            <div className="sampleNBSlider sampleFilterQContainer">
              <NumberBoxDrag
                initialValue={1}
                increment={0.01}
                lowerLimit={0.1}
                upperLimit={5}
                labelText="Q"
                decimalPlace="2"
              />
            </div>
          </div>
        </div>
        <div className="sampleNBSlider sampleLevelContainer">
          <NumberBoxDrag
            initialValue={1}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="LEVEL"
            decimalPlace="2"
          />
        </div>
      </div>
      <div className="sampleControlBottom">
        <div className="sampleSelectorContainer">
          <LCDScreen callback={UpdateSample} screenText="No Sample" />
        </div>
        <div className="sampleNBSlider sampleSpeedContainer">
          <NumberBoxDrag
            initialValue={1}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Speed"
            decimalPlace="2"
          />
        </div>
        <div className="sampleNBSlider sampleLengthContainer">
          <NumberBoxDrag
            initialValue={1}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Length"
            decimalPlace="2"
          />
        </div>
        <div className="sampleNBSlider sampleStartContainer">
          <NumberBoxDrag
            initialValue={1}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Start"
            decimalPlace="2"
          />
        </div>
        <div className="sampleNBSlider samplePitchContainer">
          <NumberBoxDrag
            initialValue={1}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Pitch"
            decimalPlace="2"
          />
        </div>
      </div>
    </div>
  );
}

export default SampleControls;
