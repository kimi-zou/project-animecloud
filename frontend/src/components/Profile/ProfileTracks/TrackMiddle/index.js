import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

import * as playerActions from "../../../../store/player";
import { MusicPlayerContext } from "../../../../context/MusicPlayerContext";
import { ProfilePlayerContext } from "../../../../context/ProfilePlayerContext";


const TrackMiddle = ({ track, index }) => {
  const dispatch = useDispatch();

  // Global states
  const user = useSelector(state => state.user.currentViewUser);
  const playerState = useSelector(state => state.player);
  const audio = useSelector(state => state.player.audioNode); 
  const currentSong = useSelector(state => state.player.currentSong); 
  const playing = useSelector(state => state.player.playing); 
  const waveform = useSelector(state => state.player.waveform); 

  // Context
  const { setCurrentTime } = useContext(MusicPlayerContext)
  const { setLocalWave, setLocalTime, onPlay, setOnPlay } = useContext(ProfilePlayerContext)

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
      // Update progress bar and waveform time
      setCurrentTime(wavesurfer.getCurrentTime());
      if (audio.current) audio.current.currentTime = wavesurfer.getCurrentTime();
      }
    ) 
    wavesurfer.on("audioprocess", () => {
      setLocalTime(wavesurfer.getCurrentTime());
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