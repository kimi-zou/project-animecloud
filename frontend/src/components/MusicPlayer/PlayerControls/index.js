import { useContext, useEffect } from 'react';
import { useSelector } from "react-redux";
import { MusicPlayerContext } from "../../../context/MusicPlayerContext";

import PrevSong from "./PrevSong";
import PlayPause from "./PlayPause";
import NextSong from "./NextSong";
import Random from "./Random";
import Repeat from "./Repeat";

import "../MusicPlayer.css";

const PlayerControls = () => {
  const { setDisabledOn } = useContext(MusicPlayerContext)

  // States
  const currentSong = useSelector(state => state.player.currentSong); 

  // Enable control buttons
  useEffect(() => {
    if(currentSong.id > -1) setDisabledOn(false);
  }, [currentSong])

  return (
    <div className="player__controls-session">
      <PrevSong />
      <PlayPause />
      <NextSong />
      <Random />
      <Repeat />
    </div>
  )
};

export default PlayerControls;