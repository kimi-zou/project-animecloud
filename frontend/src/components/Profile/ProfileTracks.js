import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState, useRef } from 'react';
// import WaveSurfer from 'wavesurfer.js';

import * as playerActions from "../../store/player";
import "./Profile.css"; 

// --------------------------------------------------------------------
const ProfileTracks = ({ user, track, index }) => {
  const dispatch = useDispatch();

  //----------------    States    -------------------
  // Global states
  const playerState = useSelector(state => state.player); 
  const playing = playerState.playing;
  const audio = playerState.audioState;
  const currentPlayingSong = playerState.currentSong;
  
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
  const setSong = () => dispatch(playerActions.setCurrentSong(index));

  // 3. Toggle playing state: Play/Pause
  const toggleAudio = () => audio.current.paused ? audio.current.play() : audio.current.pause();
  const togglePlayingState = () => {
    if (currentPlayingSong === index) {
      dispatch(playerActions.togglePlaying(playerState));
    } else {
      if (!playing) dispatch(playerActions.togglePlaying(playerState));
    }
  }


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
            <div className="profile-player__play-icon" onClick={() => { setSong(); togglePlayingState(); toggleAudio(); }}>
            { playing && currentPlayingSong === index
              ? <i className="fas fa-pause-circle fa-4x" id={`pause-${index}`} /> 
              : <i className="fas fa-play-circle fa-4x" id={`play-${index}`} />}
            </div>
            <div className="profile-player__name">
              <div className="profile-player__name-user">{user.displayName}</div>
              <div className="profile-player__name-track">{track.title}</div>
            </div>
          </div>
          <div className="profile-player__date">{calTime()}</div>
        </div>
        <div className="profile-player__middle" id={`waveform-${index}`}>
        </div>
        <div className="profile-player__bottom">
          <div className="profile-player__edits">
            <button type="button" className="profile-player__edit-button profile-player__edit-buttons">Edit</button>
            <button type="button" className="profile-player__delete-button profile-player__edit-buttons">Delete</button>
          </div>
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