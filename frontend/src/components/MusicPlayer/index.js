import React, { useEffect, useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import PlayerControls from "./PlayerControls";
import PlayerProgressBar from "./PlayerProgressBar";
import PlayerVolume from "./PlayerVolume";
import PlayerInfo from './PlayerInfo';

import * as playerActions from "../../store/player";
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import "./MusicPlayer.css";

//-------------------------------------------------
const MusicPlayer = ({ user }) => {
  const dispatch = useDispatch();
  const audioRef = useRef(); // Create a Ref Object

  // Context 
  const { setCurrentTime, setDuration, handleEnd } = useContext(MusicPlayerContext) 

  // States
  const playerState = useSelector(state => state.player); 
  // const [trackSrc, setTrackSrc] = useState("");
  // const audioSrc = playerState.audioSrc;


  // Save the <audio> DOM into Global State
  useEffect(() => dispatch(playerActions.saveAudioNode(audioRef)), []);


  return (
    <div className="player-container">
      <audio 
        onTimeUpdate={(e) => { // When audio currentTime has been updated, do...
          setCurrentTime(e.target.currentTime); // Save time to player context
          dispatch(playerActions.saveAudioTime(e.target.currentTime))
          }  
        } 
        onCanPlay={(e) => setDuration(e.target.duration)} // The browser can play the media
        onEnded={handleEnd} // When media reacheds the end
        crossOrigin="anonymous"

        ref={audioRef} 
        type="audio/mpeg" 
        preload="true"
        src={playerState.audioSrc} 
      />
      <PlayerControls />
      <PlayerProgressBar />
      <PlayerVolume />
      <PlayerInfo user={user}/>
    </div>
  )
}

export default MusicPlayer;