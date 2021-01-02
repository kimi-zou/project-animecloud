import { useContext } from 'react';
import { MusicPlayerContext } from "../../../context/MusicPlayerContext";
import "../MusicPlayer.css";

const PrevSong = () => {
  //Context
  const { prevSong, disabledOn} = useContext(MusicPlayerContext);

  return (
    <button className="controls__previous controls" onClick={prevSong} disabled={disabledOn}>
      <i className="fas fa-step-backward" />
    </button>
  )
}

export default PrevSong;