const { useEffect, useState } = React;

const bank = [
  { key: "Q", id: "Heater 1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater 2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater 3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater 4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

function DrumPad({ keyTrigger, url, id, playSound }) {
  return (
    <div className="drum-pad" id={id} onClick={() => playSound(keyTrigger)}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </div>
  );
}

function DrumMachine() {
  const [display, setDisplay] = useState("");

  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      const sound = bank.find(b => b.key === key);
      if (sound) {
        setDisplay(sound.id);
      }
    }
  };

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    if (bank.some(b => b.key === key)) {
      playSound(key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="pad-grid">
        {bank.map(pad => (
          <DrumPad
            key={pad.key}
            keyTrigger={pad.key}
            url={pad.url}
            id={pad.id}
            playSound={playSound}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
