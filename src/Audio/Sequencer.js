import SequencerStripAudio from "./SequencerStrip";
class Sequencer {
  constructor() {
    console.log("Initialised");
    this.strips = [];
  }

  initialiseSequencer() {}

  playSequencer(isOn) {}

  //returns false if a duplicate strip is trying ot be added
  validateNewStrip(newStrip) {
    for (let x = 0; x < this.strips.length; x++) {
      if (this.strips[x].id === newStrip.id) {
        console.log(this.strips[x].id);
        return false;
      }
    }
    return true;
  }
  addNewStrip(strip) {
    if (this.validateNewStrip(strip)) {
      this.strips.push(strip);
    } else {
      console.log("DUPLICATE STRIP DETECTED");
    }
    console.log(this.strips);
  }
  getNewStripAudio() {
    return new SequencerStripAudio();
  }

  deleteStrip(strip) {
    console.log(this.strips.indexOf(strip));
    this.strips = this.strips.filter((Strip) => Strip !== strip);
  }
}
export default Sequencer;
