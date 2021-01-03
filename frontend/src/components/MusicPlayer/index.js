import React, { useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../../store/player";
import { MusicPlayerContext } from "../../context/MusicPlayerContext";

import PlayerControls from "./PlayerControls/index";
import PlayerProgressBar from "./PlayerProgressBar";
import PlayerVolume from "./PlayerVolume";
import PlayerInfo from './PlayerInfo';

import "./MusicPlayer.css";

//-------------------------------------------------
const MusicPlayer = ({ user }) => {
  const dispatch = useDispatch();
  const audioRef = useRef(); // Create a Ref Object

  // Context 
  const { setCurrentTime, setDuration, handleEnd } = useContext(MusicPlayerContext) 

  // States
  const audioSrc = useSelector(state => state.player.audioSrc); 
  const currentSong = useSelector(state => state.player.currentSong); 

  // Save the <audio> DOM into Global State
  useEffect(() => dispatch(playerActions.saveAudioNode(audioRef)), []);

  return (
    <div className="player-container">
      <audio 
        onTimeUpdate={(e) => { setCurrentTime(e.target.currentTime) }}
        onCanPlay={(e) => setDuration(e.target.duration)} // The browser can play the media
        onEnded={handleEnd} // When media reacheds the end
        crossOrigin="anonymous"

        ref={audioRef} 
        type="audio/mpeg" 
        preload="true"
        // src={currentSong.id > -1 && currentSong.trackPath} 
      />
      <PlayerControls />
      <PlayerProgressBar />
      <PlayerVolume />
      <PlayerInfo user={user}/>
    </div>
  )
}

export default MusicPlayer;