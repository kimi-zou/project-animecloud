import { useContext, useState } from 'react';
import { useSelector } from "react-redux";
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import "./MusicPlayer.css";

const PlayerProgressBar = () => {
  const { 
    currentTime, 
    setCurrentTime,
    duration, 
    fmtMSS
  } = useContext(MusicPlayerContext)

  // States
  const playerState = useSelector(state => state.player); 
  const audio = playerState.audioNode;  

  // Helper Functions
  const handleProgress = (e) => {
    let compute = (e.target.value * duration) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  }

  //---------------- Render -------------------
  return (
    <div className="player__progress-session">
      <span className="progress__current-time">{fmtMSS(currentTime)}</span>
      <input 
        type="range" name="progressBar" id="prgbar" 
        onChange={handleProgress}
        value={duration ? (currentTime * 100) / duration : 0}
      />
      <span className="progress__total-time">{fmtMSS(duration)}</span>
    </div>
  )
};

export default PlayerProgressBar;