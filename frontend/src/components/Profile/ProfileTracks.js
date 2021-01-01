import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import * as playerActions from "../../store/player";
import "./Profile.css"; 

// --------------------------------------------------------------------
const ProfileTracks = ({ user, track, index }) => {
  const dispatch = useDispatch();

  //----------------    States    -------------------
  // Global states
  const [onPlay, setOnPlay] = useState(false);
  const sessionUser = useSelector(state => state.session.user); 
  const playerState = useSelector(state => state.player); 
  const audio = playerState.audioNode;
  const playing = playerState.playing;
  const currentSong = playerState.currentSong;

  // Context 
  const { 
    currentTime,
    a
  } = useContext(MusicPlayerContext)
  
  console.log(a);
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
      audio.current.currentTime = 100;
      audio.current.play();
    } else {
      audio.current.currentTime = 100;
      audio.current.pause();
    }
  }

  // 4. Update playing state in store
  const togglePlayingState = () => {
    if (playing && onPlay) dispatch(playerActions.togglePlaying(playerState));
      if (!playing && !onPlay) dispatch(playerActions.togglePlaying(playerState));
  }

  // 5. Toggle button according to state
  const toggleButton = () => playing ? setOnPlay(false) : setOnPlay(true);


  //----------------    Event Listeners   -------------------
  useEffect(() => {
    if (currentSong && currentSong.id !== track.id) {
      setOnPlay(false);
    } else {
      if (!playing) setOnPlay(false);
      if (playing) setOnPlay(true);
    }
  }, [currentSong, playing])

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
        <div className="profile-player__middle">
        </div>
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