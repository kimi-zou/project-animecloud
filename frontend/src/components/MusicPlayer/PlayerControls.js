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
  const currentSong = playerState.currentSong;
  const audio = playerState.audioNode;
  const randomOn = playerState.random;
  const repeatOn = playerState.repeat;
  const [activeRandom, setActiveRandom] = useState(""); // css
  const [activeRepeat, setActiveRepeat] = useState(""); // css
  const [disabledOn, setDisabledOn] = useState(true);


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

  // 3. Enable control buttons
  useEffect(() => {
    if(currentSong.id > -1) setDisabledOn(false);
  }, [currentSong])

  return (
    <div className="player__controls-session">
      <button className="controls__previous controls" onClick={prevSong} disabled={disabledOn}>
        <i className="fas fa-step-backward" />
      </button>
      <button className="controls__play controls" onClick={() => { togglePlayingState(); toggleAudio(); } } disabled={disabledOn}>
        { playerState.playing 
          ? <i className="fas fa-pause" /> 
          : <i className="fas fa-play" />}
      </button>
      <button className="controls__next controls" onClick={nextSong} disabled={disabledOn}>
        <i className="fas fa-step-forward" />
      </button>
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