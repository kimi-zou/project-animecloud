import { useContext, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { MusicPlayerContext } from "../../../context/MusicPlayerContext";
import "../MusicPlayer.css";

const Random = () => {
  // Global state
  const randomOn = useSelector(state => state.player.random); 

  // Context
  const { toggleRandomState } = useContext(MusicPlayerContext);

  // Local State
  const [activeRandom, setActiveRandom] = useState(""); 

  // Change random button color
  useEffect(() => {
    if (randomOn)  setActiveRandom("controls__random--active");
    if (!randomOn) setActiveRandom("");
  }, [randomOn])

  return (
    <div className="controls__shuffle controls" onClick={toggleRandomState}>
      <i className={`fas fa-random ${activeRandom}`}></i>
    </div>
  )
}

export default Random;