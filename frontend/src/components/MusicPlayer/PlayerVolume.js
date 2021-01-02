import { useContext } from 'react';
import { MusicPlayerContext } from "../../context/MusicPlayerContext";

const PlayerVolume = () => {
  const { prgVol, handleVolume, toggleMute } = useContext(MusicPlayerContext)

  return (
    <div className="player__volume-session">
      <div className="player__volume-icon">
        { 
          prgVol === 0  
          ? <i className="fas fa-volume-mute" onClick={toggleMute} />
          : <i className="fas fa-volume-down" onClick={toggleMute} />
        }
      </div>
      <input 
        type="range" 
        name="volbar" 
        id="volbar" 
        value={Math.round(prgVol * 100)}
        onChange={(e) => handleVolume(e.target.value / 100)}
      />
    </div>
  )
};

export default PlayerVolume;