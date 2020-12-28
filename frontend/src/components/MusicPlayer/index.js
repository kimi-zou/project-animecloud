import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../../store/player";
import "./MusicPlayer.css";

//-------------------------------------------------
const MusicPlayer = ({ audioContext }) => {
  const dispatch = useDispatch();

  // Audio Ref
  const audio = useRef("audio_tag");
  
  // Global states
  const playerState = useSelector(state => state.player); 

  // States 
  const [currentTime, setCurrentTime] = useState(0);
  const [stateVol, setStateVol] = useState(0.3);
  const [dur, setDur] = useState(0);

  // cssStates
  const [activeRandom, setActiveRandom] = useState("");
  const [activeRepeat, setActiveRepeat] = useState("");

  //---------------- Helper functions -------------------
  // 1. Play prev song
  const prevSong = () => {
    if (playerState.songs) {
      if (playerState.currentSong === 0) {
        console.log(audio.current.paused);
        dispatch(playerActions.setCurrentSong(playerState.songs.length - 1));
      } else {
        dispatch(playerActions.setCurrentSong(playerState.currentSong - 1));
      }
    }
  }

  // 2. Toggle playing state: Play/Pause
  const toggleAudio = () => audio.current.paused ? audio.current.play() : audio.current.pause();
  const togglePlayingState = () => dispatch(playerActions.togglePlaying(playerState));

  // 3. Play next song
  const nextSong = () => {
    if (playerState.songs) {
      if (playerState.currentSong === playerState.songs.length - 1) {
        dispatch(playerActions.setCurrentSong(0));
      } else {
        dispatch(playerActions.setCurrentSong(playerState.currentSong + 1));
      }
    }
  }

  // 4. Toggle shuffle
  const toggleRandomState = () => dispatch(playerActions.toggleRandom(playerState))

  // 5. Toggle loop
  const toggleRepeatState = () => dispatch(playerActions.toggleRepeat(playerState));

  // 6. Update progress bar
     // Calculate progress bar time
  const fmtMSS = (s) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + parseInt(s);

     //  Update progress
  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  }

  // 7. Update volume
  const handleVolume = (vol) => {
    setStateVol(vol);
    audio.current.volume = vol;
  }

  // 8. Handle end of song
  const handleEnd = () => {
    if (playerState.random) {
      let randomIndex = parseInt(Math.random() * playerState.songs.length);
      dispatch(playerActions.setCurrentSong(randomIndex));
    }
    if (playerState.repeat) {
      nextSong();
    } else if (playerState.currentSong === playerState.songs.length - 1) {
      togglePlayingState();
      return;
    } else nextSong();
  }

  //---------------- Event Listeners -------------------
  // Listen to currentSong change
  useEffect(() => {
    audio.current.volume = stateVol;
    if (playerState.playing) audio.current.play()
    if (!playerState.playing) audio.current.pause();

  }, [dispatch(playerActions.setCurrentSong)])

  // Change random button color
  useEffect(() => {
    if (playerState.random)  setActiveRandom("controls__random--active");
    if (!playerState.random) setActiveRandom("");
  }, [playerState.random])

  // Change repeat button color
  useEffect(() => {
    if (playerState.repeat)  setActiveRepeat("controls__repeat--active");
    if (!playerState.repeat) setActiveRepeat("");
  }, [playerState.repeat])


  return (
    <div className="player-container">
        <audio 
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)} // currentTime has been updated
          onCanPlay={(e) => setDur(e.target.duration)} // The browser can play the media
          onEnded={handleEnd} // When media reacheds the end

          ref={audio} 
          type="audio/mpeg" 
          preload="true"
          src={playerState.songs && `/uploads/tracks/${playerState.songs[playerState.currentSong].trackPath}`} 
        />
      <div className="player__controls-session">
        <div className="controls__previous controls" onClick={prevSong}>
          <i className="fas fa-step-backward" />
        </div>
        <div className="controls__play controls" onClick={() => { togglePlayingState(); toggleAudio(); }}>
          { playerState.playing ? <i className="fas fa-pause"></i> : <i className="fas fa-play" />}
        </div>
        <div className="controls__next controls" onClick={nextSong}>
          <i className="fas fa-step-forward" />
        </div>
        <div className="controls__shuffle controls" onClick={toggleRandomState}>
          <i className={`fas fa-random ${activeRandom}`}></i>
        </div>
        <div className="controls__loop controls" onClick={toggleRepeatState}>
          <i className={`fas fa-redo-alt ${activeRepeat}`}></i>
        </div>
      </div>
      <div className="player__progress-session">
        <span className="progress__current-time">{fmtMSS(currentTime)}</span>
        <input 
          type="range" name="progressBar" id="prgbar" 
          onChange={handleProgress}
          value={dur ? (currentTime * 100) / dur : 0}
        />
        <span className="progress__total-time">{fmtMSS(dur)}</span>
      </div>
      <div className="player__volume-session">
        <i className="fas fa-volume-down"></i>
        <input 
          type="range" 
          name="volbar" 
          id="volbar" 
          value={Math.round(stateVol * 100)}
          onChange={(e) => handleVolume(e.target.value / 100)}
        />
      </div>
      <div className="player__track-info-session">
        <div className="track-info__cover">
          {/* <img className="track-info__cover-img" src={`/uploads/covers/${track.coverImg}`} alt="test"/> */}
        </div>
        <div className="track-info__name">
          {/* <div className="track-info__name-user">{user.displayName}</div>
          <div className="track-info__name-track">{track.title}</div> */}
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer;