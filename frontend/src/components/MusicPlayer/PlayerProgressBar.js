import { useContext } from 'react';
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import "./MusicPlayer.css";

const PlayerProgressBar = () => {
  const { currentTime, duration, handleProgress, formatSecondsAsTime, updateWavePrg } = useContext(MusicPlayerContext)
  // console.log(currentTime);
  // console.log(duration);
  //---------------- Render -------------------
  return (
    <div className="player__progress-session">
      <span className="progress__current-time">{formatSecondsAsTime(currentTime)}</span>
      <MusicPlayerContext.Consumer>
        {({currentTime}) => (
          <input 
            type="range" name="progressBar" id="prgbar" 
            onChange={(e) => {
              updateWavePrg();
              handleProgress(e);
            }}
            value={duration ? (currentTime * 100) / duration : 0}
          />
        )}
      </MusicPlayerContext.Consumer>
      <span className="progress__total-time">{formatSecondsAsTime(duration)}</span>
    </div>
  )
};

export default PlayerProgressBar;