import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

import { MusicPlayerContext } from "../../../../context/MusicPlayerContext";


const TrackMiddle = ({ track, index, setLocalWave }) => {
  // Global states
  const user = useSelector(state => state.user.currentViewUser);
  const audio = useSelector(state => state.player.audioNode); 

  // Context
  const { setCurrentTime } = useContext(MusicPlayerContext)

  // Create Wavesurfer and attach to component div
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
    wavesurfer.on("seek", () => {
      console.log("from waveform: " + wavesurfer.getCurrentTime()); // Delete later
      setCurrentTime(wavesurfer.getCurrentTime());
      if(audio.current) audio.current.currentTime = wavesurfer.getCurrentTime();
    }) 
    setLocalWave(wavesurfer);

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