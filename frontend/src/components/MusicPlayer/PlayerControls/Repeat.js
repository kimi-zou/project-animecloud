import { useContext, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { MusicPlayerContext } from "../../../context/MusicPlayerContext";
import "../MusicPlayer.css";

const Repeat = () => {
  // Global state
  const repeatOn = useSelector(state => state.player.repeat); 

  // Context
  const { toggleRepeatState } = useContext(MusicPlayerContext);

  // Local State
  const [activeRepeat, setActiveRepeat] = useState(""); // css

  // Change random button color
  useEffect(() => {
    if (repeatOn)  setActiveRepeat("controls__repeat--active");
    if (!repeatOn) setActiveRepeat("");
  }, [repeatOn])

  return (
    <div className="controls__loop controls" onClick={toggleRepeatState}>
      <i className={`fas fa-redo-alt ${activeRepeat}`}></i>
    </div>
  )
}

export default Repeat;