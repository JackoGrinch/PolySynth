import React, { useState, useEffect } from "react";

import "./styles.css";
import SequencerStrip from "./component/SequencerStrip/SequencerStrip";
import SequencerController from "./component/SequencerController/SequencerController";
import Metronome from "./Audio/Metronome";
//REMOVE DEFAULT CONTEXT MENU
function SequencerFrame(props) {
  //AN ARRAY OF OBJECTS CONTAINING ID OF RELATED STRIP AND METRONOME THAT CAN FUNCTION INDEPENDANTLY
  const [metronomes, setMetronome] = useState([
    { id: 0, metronome: new Metronome(80, null) }
  ]);

  //INITIAL STRIP WITH ID 0 AND A THE INITIAL USESTATE() METRONOME OF ID 0
  const [sequencerStrips, setSequencerStrips] = useState([
    {
      name: "Strip 1",
      id: 0,
      numberOfSteps: 8,
      setNumberOfSteps: (steps) => {
        this.numberOfSteps = steps;
      },
      metronome: metronomes[0]
    }
  ]);

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
    let newName = "Strip " + (getNextAvailableID() + 1).toString();
    //CREATE A NEW METRONOME AND ADD IT INTO THE STATE CONTROLLED
    //metronomes ARRAY WITH THE NEW CORROSPONDING ID
    setMetronome((prevMetro) => [
      ...prevMetro,
      { id: getNextAvailableID(), metronome: new Metronome(80, null) }
    ]);

    //COMPILE THE NEW GENERATES STRIP DATA AND PUSH IT INTO THE STATE CONTROLLED sequencerStrips Array
    const newStrip = {
      name: newName,
      id: getNextAvailableID(),
      numberOfSteps: 8,
      metronome: metronomes[getNextAvailableID()]
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
      <SequencerController
        strips={sequencerStrips}
        sequencerAudio={props.audio}
        startMetronome={startMetronome}
      />
      {sequencerStrips.map((Strip) => (
        <SequencerStrip
          // updateMetro={updateMetronome}
          metro={metronomes[Strip.id].metronome}
          name={Strip.name}
          key={Strip.id}
          id={Strip.id}
          numSteps={Strip.numberOfSteps}
          removeStrip={removeStrip}
        />
      ))}
      <div onClick={addStrip} className="addStripPanel">
        +
      </div>
    </div>
  );
}

export default SequencerFrame;
