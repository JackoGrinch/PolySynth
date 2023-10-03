import React from "react";
import "./style.css";
import NumberBoxDrag from "../component/NumberBox/NumberBoxDrag";
import LCDScreen from "../component/LCDScreen/LCDScreen";
function SampleControls(props) {
  function updateSampleControl(identifier, value) {
    props.updateSampleControl(identifier, value, props.selectedStrip.id);
  }

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
                value={props.selectedStrip.sample.filter.freq}
                increment={0.01}
                lowerLimit={0.1}
                upperLimit={5}
                labelText="Freq"
                decimalPlace="2"
                identifier="freq"
                handleChange={updateSampleControl}
              />
            </div>
            <div className="sampleNBSlider sampleFilterResContainer">
              <NumberBoxDrag
                value={props.selectedStrip.sample.filter.res}
                increment={0.01}
                lowerLimit={0.1}
                upperLimit={5}
                labelText="Res"
                decimalPlace="2"
                identifier="res"
                handleChange={updateSampleControl}
              />
            </div>
            <div className="sampleNBSlider sampleFilterQContainer">
              <NumberBoxDrag
                value={props.selectedStrip.sample.filter.q}
                increment={0.01}
                lowerLimit={0.1}
                upperLimit={5}
                labelText="Q"
                decimalPlace="2"
                identifier="q"
                handleChange={updateSampleControl}
              />
            </div>
          </div>
        </div>
        <div className="sampleNBSlider sampleLevelContainer">
          <NumberBoxDrag
            value={props.selectedStrip.sample.level}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="LEVEL"
            decimalPlace="2"
            identifier="level"
            handleChange={updateSampleControl}
          />
        </div>
      </div>
      <div className="sampleControlBottom">
        <div className="sampleSelectorContainer">
          <LCDScreen callback={updateSampleControl} screenText="No Sample" />
        </div>
        <div className="sampleNBSlider sampleSpeedContainer">
          <NumberBoxDrag
            value={props.selectedStrip.sample.speed}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Speed"
            decimalPlace="2"
            identifier="speed"
            handleChange={updateSampleControl}
          />
        </div>
        <div className="sampleNBSlider sampleLengthContainer">
          <NumberBoxDrag
            value={props.selectedStrip.sample.length}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Length"
            decimalPlace="2"
            identifier="length"
            handleChange={updateSampleControl}
          />
        </div>
        <div className="sampleNBSlider sampleStartContainer">
          <NumberBoxDrag
            value={props.selectedStrip.sample.start}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Start"
            decimalPlace="2"
            identifier="start"
            handleChange={updateSampleControl}
          />
        </div>
        <div className="sampleNBSlider samplePitchContainer">
          <NumberBoxDrag
            value={props.selectedStrip.sample.pitch}
            increment={0.01}
            lowerLimit={0.1}
            upperLimit={5}
            labelText="Pitch"
            decimalPlace="2"
            identifier="pitch"
            handleChange={updateSampleControl}
          />
        </div>
      </div>
    </div>
  );
}

export default SampleControls;
