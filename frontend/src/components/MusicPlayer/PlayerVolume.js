import { useContext } from 'react';
import { useSelector } from "react-redux";
import { MusicPlayerContext } from "../../context/MusicPlayerContext";

const PlayerVolume = () => {
  const { volume, setVolume } = useContext(MusicPlayerContext)

  // States
  const playerState = useSelector(state => state.player); 
  const audio = playerState.audioNode;
  

  // Helper Functions
  const handleVolume = (vol) => {
    setVolume(vol);
    audio.current.volume = vol;
  }

  return (
    <div className="player__volume-session">
      <i className="fas fa-volume-down"></i>
      <input 
        type="range" 
        name="volbar" 
        id="volbar" 
        value={Math.round(volume * 100)}
        onChange={(e) => handleVolume(e.target.value / 100)}
      />
    </div>
  )
};

export default PlayerVolume;