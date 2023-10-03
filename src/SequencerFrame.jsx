import React, { useState, useEffect } from "react";

import "./styles.css";
import SequencerStrip from "./component/SequencerStrip/SequencerStrip";
import SequencerController from "./component/SequencerController/SequencerController";
import Metronome from "./Audio/Metronome";
//REMOVE DEFAULT CONTEXT MENU
function SequencerFrame(props) {
  var StripKey = 0;

  const newStripSettings = {
    name: "No Sample",
    location: "null",
    speed: 1,
    length: 1,
    start: 1,
    pitch: 1,
    level: 1,
    filter: {
      type: 0,
      freq: 1,
      res: 1,
      q: 1,
    },
  };

  //AN ARRAY OF OBJECTS CONTAINING ID OF RELATED STRIP AND METRONOME THAT CAN FUNCTION INDEPENDANTLY
  const [metronomes, setMetronome] = useState([
    { id: 0, metronome: new Metronome(80, null) },
  ]);

  //ALL CHANGES TO STRIP INFORMATION MUST BE PASSED UP TO THIS CONTROLLED ARRAY OF STRIP AND REDISTRIBUTED FROM HERE
  //INITIAL STRIP WITH ID 0 AND A THE INITIAL USESTATE() METRONOME OF ID 0
  const [sequencerStrips, setSequencerStrips] = useState([
    {
      name: "Strip 1",
      id: 0,
      isSelected: true,
      numberOfSteps: 8,
      setNumberOfSteps: (steps) => {
        this.numberOfSteps = steps;
      },
      metronome: metronomes[0],
      sample: {
        name: "No Sample",
        location: "null",
        speed: 1,
        length: 1,
        start: 1,
        pitch: 1,
        level: 1,
        filter: {
          type: 0,
          freq: 1,
          res: 1,
          q: 1,
        },
      },
    },
  ]);

  function updateSequencerStrip(property, value, id) {
    //FIND THE STRIP TO UPDATE
    let newStripInfo = Array.apply(null, sequencerStrips);
    let stripToChange;

    sequencerStrips.map((strip, index) => {
      if (strip.id === id) {
        stripToChange = strip;
      }
    });
    //UPDATE THE NECCESARY PROPERTY
    switch (property) {
      case "name":
        stripToChange.name = value;
        break;
      case "steps":
        stripToChange.steps = value;
        break;
      case "samplename":
        stripToChange.sample.name = value;
        break;
      case "samplelocation":
        stripToChange.sample.location = value;
        break;
      case "speed":
        stripToChange.sample.speed = value;
        break;
      case "length":
        stripToChange.sample.length = value;
        break;
      case "start":
        stripToChange.sample.start = value;
        break;
      case "pitch":
        stripToChange.sample.pitch = value;
        break;
      case "freq":
        stripToChange.sample.filter.freq = value;
        break;
      case "res":
        stripToChange.sample.filter.res = value;
        break;
      case "q":
        stripToChange.sample.filter.q = value;
        break;
      default:
        break;
    }

    //UPDATE THE STATE OF THE SEQUENCER ARRAY
    sequencerStrips.map((strip, index) => {
      if (strip.id === id) {
        newStripInfo[index] = stripToChange;
        setSequencerStrips(newStripInfo);
      }
    });
  }

  function selectStrip(selectedIndex) {
    let newStrips = Array.apply(null, sequencerStrips);
    newStrips.forEach((strip, index) => {
      strip.isSelected = false;
      if (index === selectedIndex) {
        strip.isSelected = true;
      }
    });
    setSequencerStrips(newStrips);
  }
  useEffect(() => {
    //CONTEXT MENU WILL ALLOW FOR CUSTOM FUNCTIONS SUCH ARE REMOVE STRIP WITHOUT TAKING UP UI SPACE
    function handleContextMenu(e) {
      e.preventDefault(); // prevents the default right-click menu from appearing
    }
    // add the event listener to the component's root element
    const rootElement = document.getElementById("my-component");
    rootElement.addEventListener("contextmenu", handleContextMenu);
    //should remove the event listener when the component is unmounted

    return () => {
      //STOP METRONOMES ON EFFECT END?
      metronomes.forEach((metronome) => {
        metronome.metronome.stop();
      });
    };
  }, [metronomes]);

  //START METRONOMES BY FOREACH ELEMENT IN IN THE STATE CONTROLLED metronomes array
  const startMetronome = (isOn) => {
    metronomes.forEach((metronome) => {
      if (!metronome.metronome.isPlaying && isOn) {
        // console.log("METRONOME NOT PLAYING: START");
        metronome.metronome.start();
      }
    });
  };
  //THIS CHECKS IF THE PARAM ID IS AN ID BEING USED IN THE SEQUENCER
  function isID(ID) {
    for (let x = 0; x < sequencerStrips.length; x++) {
      if (sequencerStrips[x].id === ID) return true;
    }
    return false;
  }
  //RETURN THE NEXT AVAILABLE ID
  function getNextAvailableID() {
    for (let x = 0; x < sequencerStrips.length; x++) {
      if (sequencerStrips[x].id !== x) {
        if (!isID(x)) return x;
      }
    }
    return sequencerStrips.length;
  }

  //WHEN A STRIP IS ADDED GENERATE A NEW ID FOR THE STRIP
  function addStrip() {
    StripKey++;
    let newName = "Strip " + (getNextAvailableID() + 1).toString();
    //CREATE A NEW METRONOME AND ADD IT INTO THE STATE CONTROLLED
    //metronomes ARRAY WITH THE NEW CORROSPONDING ID
    setMetronome((prevMetro) => [
      ...prevMetro,
      { id: getNextAvailableID(), metronome: new Metronome(80, null) },
    ]);

    //COMPILE THE NEW GENERATES STRIP DATA AND PUSH IT INTO THE STATE CONTROLLED sequencerStrips Array
    let sample = Object.assign({}, newStripSettings);
    const newStrip = {
      name: newName,
      id: getNextAvailableID(),
      numberOfSteps: 8,
      metronome: metronomes[getNextAvailableID()],
      sample: {
        name: "No Sample",
        location: "null",
        speed: 1,
        length: 1,
        start: 1,
        pitch: 1,
        level: 1,
        filter: {
          type: 0,
          freq: 1,
          q: 1,
          res: 1,
        },
      },
    };
    setSequencerStrips((prevSteps) => [...sequencerStrips, newStrip]);
  }

  //can be simplified REMOVE STRIP
  function removeStrip(ID) {
    console.log("REMOVE STRIP: " + ID);
    let stripToRemove;
    for (let x = 0; x < sequencerStrips.length; x++) {
      if (sequencerStrips[x].id === ID) {
        stripToRemove = sequencerStrips[x];
      }
    }
    props.audio.deleteStrip(stripToRemove);
    setSequencerStrips(sequencerStrips.filter((Strip) => Strip.id !== ID));
  }
  /////////////////////////////////////////////////////////////
  // IF METRONOMES ARE HELD IN STATE WITH THE sequencerStrips
  //ARRAY they can pass together and function the same!
  /////////////////////////////////////////////////////////////

  return (
    <div id="my-component">
      {sequencerStrips
        .filter((strip) => strip.isSelected === true)
        .map((stripSelected) => (
          <SequencerController
            key={0}
            updateSampleControl={updateSequencerStrip}
            selectedStrip={stripSelected}
            strips={sequencerStrips}
            sequencerAudio={props.audio}
            startMetronome={startMetronome}
          />
        ))}

      {sequencerStrips.map((Strip, index) => (
        <div
          key={index}
          onClick={() => {
            selectStrip(index);
          }}
        >
          <SequencerStrip
            updateStrip={updateSequencerStrip}
            Strip={Strip}
            metro={metronomes[Strip.id].metronome}
            // name={Strip.name}
            key={StripKey}
            // id={Strip.id}
            numSteps={Strip.numberOfSteps}
            removeStrip={removeStrip}
          />
        </div>
      ))}
      <div onClick={addStrip} className="addStripPanel">
        +
      </div>
    </div>
  );
}

export default SequencerFrame;
