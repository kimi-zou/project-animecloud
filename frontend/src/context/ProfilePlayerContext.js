import React, { useState, useContext } from "react"; 
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../store/player";
import { MusicPlayerContext } from "./MusicPlayerContext";

export const ProfilePlayerContext = React.createContext(); 

const ProfilePlayerContextProvider = ({ children }) => { 
  const dispatch = useDispatch();

  // Global states
  const playerState = useSelector(state => state.player); 
  const currentSong = useSelector(state => state.player.currentSong); 
  const audio = useSelector(state => state.player.audioNode); 
  const playing = useSelector(state => state.player.playing); 


  // Local states
  const [localWave, setLocalWave] = useState();
  const [localTime, setLocalTime]= useState(0);
  const [onPlay, setOnPlay] = useState(false);


    

  // 1. Set current song
  const setSong = (track) => {
    if (currentSong.id !== track.id) {
      dispatch(playerActions.getCurrentSong(track.id))
    }
  }

  // 2. Set current Waveform
  const setWaveform = () => {
    dispatch(playerActions.saveWaveform(localWave));
  }

  // 3. Toggle Audio Playing state
  const toggleAudio = () => {
    if (audio.current.paused && !onPlay) {
      audio.current.currentTime = localTime;
      audio.current.play();
    } else {
      audio.current.currentTime = localTime;
      audio.current.pause();
    }
  }

  // 4. Update playing state in store
  const togglePlayingState = () => {
    // if global audio is playing, and local one is also playing
    if (playing && onPlay) {
      dispatch(playerActions.togglePlaying(playerState));
    };
    // if global audio is paused, and local one is also paused
    if (!playing && !onPlay) {
      dispatch(playerActions.togglePlaying(playerState));
    }
  }

  // 5. Toggle button according to global state
  const toggleButton = () => onPlay ? setOnPlay(false) : setOnPlay(true);




  return (
    <ProfilePlayerContext.Provider value={{
      localWave, setLocalWave,
      localTime, setLocalTime,
      onPlay, setOnPlay,
      setSong,
      setWaveform,
      toggleAudio,
      togglePlayingState,
      toggleButton
    }}>
      {children}
    </ProfilePlayerContext.Provider>
  )
}

export default ProfilePlayerContextProvider;