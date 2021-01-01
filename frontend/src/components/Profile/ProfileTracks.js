import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import * as playerActions from "../../store/player";
import "./Profile.css"; 

// --------------------------------------------------------------------
const ProfileTracks = ({ user, track, index }) => {
  const dispatch = useDispatch();

  //----------------    States    -------------------
  // Global states
  const [wave, setWave] = useState();
  const [onPlay, setOnPlay] = useState(false);
  const sessionUser = useSelector(state => state.session.user); 
  const playerState = useSelector(state => state.player); 
  const audio = playerState.audioNode;
  const playing = playerState.playing;
  const currentSong = playerState.currentSong;
  const time = playerState.audioTime;

  // Context 
  const { 
    setCurrentTime, currentTime, duration
  } = useContext(MusicPlayerContext)
  
  //----------------    Helper functions    -------------------
  // 1. Calculate track release time
  const calTime = () => {
    const currentTime = Date.now();
    const trackCreatedTime = new Date(track.updatedAt);
    const timeDifference = (currentTime - trackCreatedTime)/(1000*3600*24);
    const releaseTime = Math.floor(timeDifference);
    if(releaseTime < 1) return "less than 1 day";
    return `${releaseTime} days ago`;
  }

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

  //---------------- Component -------------------
  return (
    <div className="profile-track">
      <div className="profile-track__cover">
        {track.coverImg && 
          <img className="profile-track__cover-img" 
          src={`${track.coverImg}`} 
          alt="test"/>
        }
      </div>
      <div className="profile-track__music-player">
        <div className="profile-player__top">
          <div className="profile-player__top-left">
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
            <div className="profile-player__name">
              <div className="profile-player__name-user">{user.displayName}</div>
              <div className="profile-player__name-track">{track.title}</div>
            </div>
          </div>
          <div className="profile-player__date">{calTime()}</div>
        </div>
        <div className="profile-player__middle" id={`waveform-${user.id}-${index}`} />
        <div className="profile-player__bottom">
          {sessionUser.id === user.id && 
            <div className="profile-player__edits">
              <button type="button" className="profile-player__edit-button profile-player__edit-buttons">Edit</button>
              <button type="button" className="profile-player__delete-button profile-player__edit-buttons">Delete</button>
            </div>}
          <div></div>
          <div className="profile-player__likes-comments">
            <i className="fas fa-heart"></i>
            <i className="fas fa-comment-alt"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileTracks;