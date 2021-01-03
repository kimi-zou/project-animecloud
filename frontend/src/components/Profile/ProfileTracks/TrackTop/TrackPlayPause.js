import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../../../../store/player";
import { MusicPlayerContext } from "../../../../context/MusicPlayerContext";
import { ProfilePlayerContext } from "../../../../context/ProfilePlayerContext";


const TrackPlayPause = ({ track }) => {
  const dispatch = useDispatch();

  // States
  const audio = useSelector(state => state.player.audioNode); 
  const currentSong = useSelector(state => state.player.currentSong); 
  const playing = useSelector(state => state.player.playing); 

  // Context
  const { 
    localWave, 
    onPlay, 
    setOnPlay, 
    setSong,
    setWaveform,
    toggleAudio,
    togglePlayingState,
    toggleButton 
  } = useContext(ProfilePlayerContext)

  


  //----------------    Event Listeners   -------------------
  // Handle switching current song
  useEffect(() => {
    if (!currentSong) return;
    // If this is not the current song, stop 
    if (currentSong && currentSong.id !== track.id) {
      setOnPlay(false);
      if(localWave) localWave.stop();
      if(audio.current) audio.current.currentTime = 0;
    } else { 
      // If this is the current song, keep local consistent with global playing
      if (!playing) {
        if (localWave) localWave.pause();
        setOnPlay(false);
      } else {
        if(localWave) localWave.play();
        setOnPlay(true);
      }
    }
  }, [currentSong])
  
  // Keep local play state consitent with global playing
  useEffect(() => {
    if(!currentSong) return;
    if(currentSong.id === track.id) {
      if (playing) {
        if(localWave) localWave.play();
        setOnPlay(true);
      } else {
        if (localWave) localWave.pause();
        setOnPlay(false);
      }
    }
  }, [playing])



  return (
    <div className="profile-player__play-icon" onClick={() => { 
      audio.current.src = track.trackPath;
      setSong(track); 
      setWaveform();
      toggleAudio(); 
      togglePlayingState(); 
      toggleButton();
    }}>
      { 
        onPlay 
        ? <i className="fas fa-pause-circle fa-4x" /> 
        : <i className="fas fa-play-circle fa-4x" />
      }
    </div>
  )
}

export default TrackPlayPause;