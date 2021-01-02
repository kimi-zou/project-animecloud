import { useContext } from 'react';
import { MusicPlayerContext } from "../../../context/MusicPlayerContext";
import "../MusicPlayer.css";

const NextSong = () => {
  //Context
  const { nextSong, disabledOn} = useContext(MusicPlayerContext);

  return (
    <button className="controls__next controls" onClick={nextSong} disabled={disabledOn}>
      <i className="fas fa-step-forward" />
    </button>
  )
}

export default NextSong;