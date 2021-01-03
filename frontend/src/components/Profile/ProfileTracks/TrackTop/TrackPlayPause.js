import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../../../../store/player";
import { MusicPlayerContext } from "../../../../context/MusicPlayerContext";
import { ProfilePlayerContext } from "../../../../context/ProfilePlayerContext";


const TrackPlayPause = ({ track }) => {
  const dispatch = useDispatch();


  // States
  const playerState = useSelector(state => state.player); 
  const audio = useSelector(state => state.player.audioNode); 
  const currentSong = useSelector(state => state.player.currentSong); 
  const playing = useSelector(state => state.player.playing); 

  // Context
  const { currentTime } = useContext(MusicPlayerContext);
  const { localWave, onPlay, setOnPlay, localTime } = useContext(ProfilePlayerContext)

  console.log(localTime);
  

  // 1. Set current song
  const setSong = () => {
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
      // audio.current.currentTime = localWave.getCurrentTime();
      audio.current.currentTime = localTime;
      audio.current.play();
    } else {
      // audio.current.currentTime = localWave.getCurrentTime();
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

  // 5. Toggle button according to state
  const toggleButton = () => playing ? setOnPlay(false) : setOnPlay(true);

    //----------------    Event Listeners   -------------------
    useEffect(() => {
      if (!currentSong) return;
      if (currentSong && currentSong.id !== track.id) {
        setOnPlay(false);
        if(localWave) localWave.stop();
        if(audio.current) audio.current.currentTime = 0;
      } else {
        if (!playing) {
          if (localWave) localWave.pause();
          setOnPlay(false);
        } else {
          if(localWave) localWave.play();
          setOnPlay(true);
        }
      }
    }, [currentSong])
    
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
      // dispatch(playerActions.setAudioSrc(track.trackPath));
      audio.current.src = track.trackPath;
      setSong(); 
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