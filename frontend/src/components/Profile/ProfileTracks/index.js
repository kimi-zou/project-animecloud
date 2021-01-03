import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";


import { MusicPlayerContext } from "../../../context/MusicPlayerContext";
import * as playerActions from "../../../store/player";

import TrackCover from "./TrackCover";
import TrackTop from "./TrackTop/index";
import TrackMiddle from "./TrackMiddle/index";
import TrackBottom from "./TrackBottom/index";

import "../Profile.css"; 

// --------------------------------------------------------------------
const ProfileTracks = ({ user, track, index, key }) => {
  const dispatch = useDispatch();

  //----------------    States    -------------------
  // Global states
  const [wave, setWave] = useState();

  const playerState = useSelector(state => state.player); 
  const audio = playerState.audioNode;
  const playing = playerState.playing;
  const currentSong = playerState.currentSong;
  const time = playerState.audioTime;

  // Context 
  const { setCurrentTime, setOnPlay } = useContext(MusicPlayerContext)

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



  //---------------- Component -------------------
  return (
    <div className="profile-track">
      <TrackCover track={track}/>
      <div className="profile-track__music-player">
        <TrackTop track={track} user={user}/>
        <TrackMiddle track={track} user={user} index={index}/>
        <TrackBottom user={user}/>
      </div>
    </div>
  )
}

export default ProfileTracks;