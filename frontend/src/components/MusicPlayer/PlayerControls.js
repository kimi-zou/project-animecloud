import { useContext, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import "./MusicPlayer.css";

const PlayerControls = () => {
  const { 
    prevSong, 
    nextSong,
    togglePlayingState, 
    toggleRandomState,
    toggleRepeatState,
  } = useContext(MusicPlayerContext)

  // States
  const playerState = useSelector(state => state.player); 
  const audio = playerState.audioNode;
  const randomOn = playerState.random;
  const repeatOn = playerState.repeat;
  const [activeRandom, setActiveRandom] = useState(""); // css
  const [activeRepeat, setActiveRepeat] = useState(""); // css


  // Helper Functions
  const toggleAudio = () => {
    audio.current.paused ? audio.current.play() : audio.current.pause();
  }

  // Event Listeners
  // 1. Change random button color
  useEffect(() => {
    if (randomOn)  setActiveRandom("controls__random--active");
    if (!randomOn) setActiveRandom("");
  }, [randomOn])

  // 2. Change repeat button color
  useEffect(() => {
    if (repeatOn)  setActiveRepeat("controls__repeat--active");
    if (!repeatOn) setActiveRepeat("");
  }, [repeatOn])

  return (
    <div className="player__controls-session">
      <div className="controls__previous controls" onClick={prevSong}>
        <i className="fas fa-step-backward" />
      </div>
      <div className="controls__play controls" onClick={() => { togglePlayingState(); toggleAudio(); }}>
        { playerState.playing 
          ? <i className="fas fa-pause" /> 
          : <i className="fas fa-play" />}
      </div>
      <div className="controls__next controls" onClick={nextSong}>
        <i className="fas fa-step-forward" />
      </div>
      <div className="controls__shuffle controls" onClick={toggleRandomState}>
        <i className={`fas fa-random ${activeRandom}`}></i>
      </div>
      <div className="controls__loop controls" onClick={toggleRepeatState}>
        <i className={`fas fa-redo-alt ${activeRepeat}`}></i>
      </div>
    </div>
  )
};

export default PlayerControls;