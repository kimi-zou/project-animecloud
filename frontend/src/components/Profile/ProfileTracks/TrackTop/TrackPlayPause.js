import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../../../../store/player";
import { MusicPlayerContext } from "../../../../context/MusicPlayerContext";


const TrackPlayPause = ({ track }) => {
  const dispatch = useDispatch();

  // States
  const playerState = useSelector(state => state.player); 
  const audio = useSelector(state => state.player.audioNode); 
  const currentSong = useSelector(state => state.player.currentSong); 
  const time = useSelector(state => state.player.time); 
  const playing = useSelector(state => state.player.playing); 

  // Context
  const { wave, onPlay, setOnPlay,} = useContext(MusicPlayerContext);



  // 2. Set current song
  const setSong = () => {
    if (currentSong.id !== track.id) {
      dispatch(playerActions.setCurrentSong(track));
    }
  }

  // 3. Toggle Audio Playing state
  const toggleAudio = () => {
    // audio.current.paused && !onPlay ? audio.current.play() : audio.current.pause();
    if (audio.current.paused && !onPlay) {
      audio.current.currentTime = time;
      audio.current.play();
    } else {
      audio.current.currentTime = time;
      audio.current.pause();
    }
  }

  // 4. Update playing state in store
  const togglePlayingState = () => {
    if (playing && onPlay) {
      dispatch(playerActions.togglePlaying(playerState));
      if (wave) wave.pause();
    };
      if (!playing && !onPlay) {
        dispatch(playerActions.togglePlaying(playerState));
        if(wave) wave.play();
      }
  }

  // 5. Toggle button according to state
  const toggleButton = () => playing ? setOnPlay(false) : setOnPlay(true);

    //----------------    Event Listeners   -------------------
    useEffect(() => {
      if (!currentSong) return;
      if (currentSong && currentSong.id !== track.id) {
        setOnPlay(false);
        if(wave) wave.stop();
        if(audio.current) audio.current.currentTime = 0;
        dispatch(playerActions.saveAudioTime(0));
      } else {
        if (!playing) {
          if (wave) wave.pause();
          setOnPlay(false);
        } else {
          if(wave) wave.play();
          setOnPlay(true);
        }
      }
    }, [currentSong])
    
    useEffect(() => {
      if(!currentSong) return;
      if(currentSong.id === track.id) {
        if (playing) {
          if(wave) wave.play();
          setOnPlay(true);
        } else {
          if (wave) wave.pause();
          setOnPlay(false);
        }
      }
    }, [playing])
  



  return (
    <div className="profile-player__play-icon" onClick={() => { 
      audio.current.src = track.trackPath;
      setSong(); 
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