import * as Tone from "tone";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
Tone.setContext(audioContext);

Tone.loaded().then(() => {
  console.log("TONE LOADED");
  Tone.start();
  Tone.Transport.start();
});

class Metronome {
  THISBEAT = null;
  constructor(tempo, onBeatCallback) {
    this.tempo = tempo;
    this.startTime = 0;
    this.onBeatCallback = onBeatCallback;
    this.currentBeat = 0;
    this.isPlaying = false;
  }

  start() {
    if (!this.isPlaying) {
      Tone.start();
      Tone.Transport.start();
      console.log("METRO START");
      this.isPlaying = true;
      this.scheduleBeat();
    }
  }

  stop() {
    this.isPlaying = false;
    Tone.Transport.clear(this.THISBEAT);
    console.log("METRO STOP");
    this.currentBeat = 0;
  }

  scheduleBeat() {
    if (!this.isPlaying) return;
    console.log("SCHEDULE BEAT");
    const beatTime = this.tempo / 120.0;
    this.THISBEAT = Tone.Transport.scheduleRepeat(
      this.onBeatCallback,
      beatTime
    );
    this.currentBeat++;
  }

  setCallback(newCallback) {
    this.onBeatCallback = newCallback;
  }
}

export default Metronome;
