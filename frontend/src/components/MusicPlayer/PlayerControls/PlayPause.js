import { useContext } from 'react';
import { useSelector } from "react-redux";
import { MusicPlayerContext } from "../../../context/MusicPlayerContext";
import "../MusicPlayer.css";

const PlayPause = () => {
  // States
  const playing = useSelector(state => state.player.playing); 

  // Context
  const { togglePlayingState, disabledOn, toggleAudio} = useContext(MusicPlayerContext);
 
  return (
    <button 
      className="controls__play controls" 
      onClick={() => { 
        togglePlayingState(); 
        toggleAudio(); 
      }} 
      disabled={disabledOn}
    >
      { 
        playing 
        ? <i className="fas fa-pause" /> 
        : <i className="fas fa-play" />
      }
    </button>
  )
}

export default PlayPause;