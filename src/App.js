import "./styles.css";
import SequencerFrame from "./SequencerFrame.jsx";
import Sequencer from "./Audio/Sequencer";
export default function App() {
  // const audio = new Sequencer();
  // audio.initialiseSequencer();

  return (
    <div className="App">
      <SequencerFrame />
    </div>
  );
}
