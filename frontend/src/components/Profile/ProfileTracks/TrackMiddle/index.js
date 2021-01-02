import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

import { MusicPlayerContext } from "../../../../context/MusicPlayerContext";
import * as playerActions from "../../../../store/player";


const TrackMiddle = ({ track, user, index }) => {
  const dispatch = useDispatch();

  // State
  const playerState = useSelector(state => state.player); 
  const audio = playerState.audioNode;
  
  // Context
  const { setCurrentTime, wave, setWave } = useContext(MusicPlayerContext)

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: `#waveform-${user.id}-${index}`,
      waveColor: "#999",
      progressColor: '#333',
      barWidth: 3,
      cursorColor: "white",
      height: 100,
      plugins: [
        CursorPlugin.create({
          position: "absolute",
          zIndex: 4,
          borderRightColor: '#333',
          opacity: '0.5',
          height: 100
        })
      ]
    }) 
    wavesurfer.load(track.trackPath);
    wavesurfer.setMute(true);
    wavesurfer.on("seek", (position) => {
      const currentTime = position * wavesurfer.getDuration();
      setCurrentTime(currentTime);
      if(audio.current) audio.current.currentTime = currentTime;
    }) 
    dispatch(playerActions.saveWaveform(wave));
    setWave(wavesurfer);
    return () => { 
      const waveContainer = document.getElementById(`waveform-${user.id}-${index}`);
      if(waveContainer) waveContainer.innerHTML = "";
    }    
  }, [])

  return (
    <div className="profile-player__middle" id={`waveform-${user.id}-${index}`} />
  )
}

export default TrackMiddle;