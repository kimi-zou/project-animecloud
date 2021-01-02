import React, { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../store/player";

//------------------------------------------------------------------------------
export const MusicPlayerContext = React.createContext(); 

const MusicPlayerContextProvider = ({ children }) => { 
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
    audioNode,
  } = useSelector(state => state.player); 
  // 2. Local
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [prgVol, setPrgVol] = useState(0.3);
  const [disabledOn, setDisabledOn] = useState(true);

  //---------------- Controls -------------------
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

  // 3. Toggle audio playing state
  const toggleAudio = () => {
    audioNode.current.paused ? audioNode.current.play() : audioNode.current.pause();
  }

  // 4. Toggle playing state: Play/Pause
  const togglePlayingState = () => {
    dispatch(playerActions.togglePlaying(playerState))
  }




  //---------------- Random & Repeat -------------------
  // 1. Toggle ramdom 
  const toggleRandomState = () => {
    dispatch(playerActions.toggleRandom(playerState));
  }

  // 2. Toggle repeat 
  const toggleRepeatState = () => {
    dispatch(playerActions.toggleRepeat(playerState));
  }

  // 8. Replay song
  const replaySong = () => {
    if(!playing) dispatch(playerActions.togglePlaying(playerState))
    audioNode.current.currentTime = 0;
    audioNode.current.play();
  }


  //---------------- Progress bar -------------------
  // 1. Calculate progress bar time
  const formatSecondsAsTime = (secs) => {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  
    // if (min < 10) min = "0" + min;  
    if (sec < 10) sec  = "0" + sec;
  
    return min + ':' + sec;
  }

  // 2. Update audio time when click on progress bar
  const handleProgress = (e) => {
    let compute = (e.target.value * duration) / 100;
    setCurrentTime(compute);
    audioNode.current.currentTime = compute;
  }


  //---------------- Volume -------------------
  // 1. Update audio volume
   const handleVolume = (vol) => {
    setVolume(vol);
    setPrgVol(vol);
    audioNode.current.volume = vol;
  }
  
  // 2. Toggle audio mute state
  const toggleMute = () => {
    if (audioNode.current.volume === 0) {
      audioNode.current.volume = volume;
      setPrgVol(volume);
    } else {
      audioNode.current.volume = 0;
      setPrgVol(0);
    } 
  }


  //---------------- Others -------------------
  // 1. Handle end of song 
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

  

  

  

  //---------------- Render -------------------
  return (
    <>
      <MusicPlayerContext.Provider  
        value={{
          disabledOn, setDisabledOn,
          currentTime, setCurrentTime,
          duration, setDuration,
          volume, setVolume,
          prgVol, setPrgVol,
          prevSong, nextSong,
          toggleAudio,
          togglePlayingState,
          toggleRandomState,
          toggleRepeatState,
          handleEnd,
          handleProgress,
          formatSecondsAsTime,
          handleVolume,
          toggleMute
        }}
      >
        {children}
      </MusicPlayerContext.Provider>
    </>
  )
};

export default MusicPlayerContextProvider;