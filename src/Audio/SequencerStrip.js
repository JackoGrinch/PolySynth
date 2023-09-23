import Metronome from "./Metronome.js";
class SequencerStripAudio {
  constructor() {
    this.metronome = new Metronome(80, this.setOnBeat);
  }

  getMetronome() {
    return this.metronome;
  }
  //METRONOME CONTROL
  setOnBeat() {
    if (this.metronomeInstance.isPlaying) {
      console.log("ON BEAT");
    }
  }

  metronomeStart() {
    console.log("PLAY BUTTON CLICKED");
    if (!this.metronome.isPlaying) {
      console.log("METRONOME NOT PLAYING: START");
      this.metronome.start();
      setTimeout(() => {
        this.metronome.stop();
      }, 5000);
    }
  }

  //SAMPLE CONTROL
  muteStrip() {}
  changeSample() {}
  triggerSample() {}
}
export default SequencerStripAudio;
