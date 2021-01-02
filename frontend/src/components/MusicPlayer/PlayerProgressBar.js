import { useContext } from 'react';
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import "./MusicPlayer.css";

const PlayerProgressBar = () => {
  const { currentTime, duration, handleProgress, formatSecondsAsTime } = useContext(MusicPlayerContext)

  //---------------- Render -------------------
  return (
    <div className="player__progress-session">
      <span className="progress__current-time">{formatSecondsAsTime(currentTime)}</span>
      <input 
        type="range" name="progressBar" id="prgbar" 
        onChange={handleProgress}
        value={duration ? (currentTime * 100) / duration : 0}
      />
      <span className="progress__total-time">{formatSecondsAsTime(duration)}</span>
    </div>
  )
};

export default PlayerProgressBar;