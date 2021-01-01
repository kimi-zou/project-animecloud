import React, { useEffect, useRef, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../store/player";

//------------------------------------------------------------------------------

export const MusicPlayerContext = React.createContext(); // 1. Create Context
const MusicPlayerContextProvider = ({ children }) => { // 2. Create a Context Provider
  const dispatch = useDispatch(); // Get dispatch function

  //---------------- States -------------------
  // 1. Global
  const playerState = useSelector(state => state.player); 
  const {  
    currentSong, 
    playlist, 
    playing,
    repeat, 
    random,
    audioNode
  } = useSelector(state => state.player); 
  // 2. Local
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.3);


  //---------------- Helper Functions -------------------
  // 1. Play prev song 
  const prevSong = () => {
    if (playlist.length === 0 && currentSong) {
      replaySong();
    } else {
      if (currentSong === 0) {
        dispatch(playerActions.setCurrentSong(playlist.length - 1));
      } else {
        dispatch(playerActions.setCurrentSong(currentSong - 1));
      }
    }
  }

  // 2. Play next song 
  const nextSong = () => {
    if (playlist.length === 0 && currentSong) {
      replaySong(); 
    } else {
      if (currentSong === playlist.length - 1) {
        dispatch(playerActions.setCurrentSong(0));
      } else {
        dispatch(playerActions.setCurrentSong(currentSong + 1));
      }
    }
  }

  // 3. Toggle playing state: Play/Pause
  const togglePlayingState = () => {
    dispatch(playerActions.togglePlaying(playerState))
  }

  // 4. Toggle shuffle 
  const toggleRandomState = () => {
    dispatch(playerActions.toggleRandom(playerState));
  }

  // 5. Toggle loop 
  const toggleRepeatState = () => {
    dispatch(playerActions.toggleRepeat(playerState));
  }

  // 6. Handle end of song 
  const handleEnd = () => {
    if (playlist.length === 0) {
      if (repeat) {
        replaySong(); 
      } else {
        audioNode.current.currentTime = 0; 
        togglePlayingState();
      }
    } else {
      if (random) {
        let randomIndex = parseInt(Math.random() * playlist.length);
        dispatch(playerActions.setCurrentSong(randomIndex));
      }
      if (repeat) {
        nextSong();
      } else nextSong();
    }
  }

  // 7. Calculate progress bar time
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + parseInt(s);
  }

  // 8. Replay song
  const replaySong = () => {
    if(!playing) dispatch(playerActions.togglePlaying(playerState))
    audioNode.current.currentTime = 0;
    audioNode.current.play();
  }

  //---------------- Render -------------------
  return (
    <>
      <MusicPlayerContext.Provider  
        value={{
          currentTime, setCurrentTime,
          duration, setDuration,
          volume, setVolume,
          prevSong, nextSong,
          togglePlayingState,
          toggleRandomState,
          toggleRepeatState,
          handleEnd,
          fmtMSS,
        }}
      >
        {children}
      </MusicPlayerContext.Provider>
      
    </>
  )
};

export default MusicPlayerContextProvider;