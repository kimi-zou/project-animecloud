import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import MusicPlayerContextProvider from "../../context/MusicPlayerContext";
import ProfileHeader from "./ProfileHeader";
import ProfileMeta from "./ProfileMeta";
import ProfileTracks from "./ProfileTracks";
import "./Profile.css";
import * as trackActions from "../../store/track";
import * as playerActions from "../../store/player";


//-----------------------------------------------------
const Profile = () => {
  const dispatch = useDispatch();

  // State
  const user = useSelector(state => state.user.currentViewUser); 
  const tracks = useSelector(state => state.track.currentUserTracks);

  // Get User Tracks
  useEffect(() => {
    dispatch(trackActions.getTracks(user.id))
  }, [user])

  return (
    <div className="profile__outer-container">
      <div className="profile__inner-container">
        <ProfileHeader user={user}/>
        <ProfileMeta user={user} tracks={tracks}/>
        {tracks && tracks.map((track, index) => { 
        return (<MusicPlayerContextProvider key={index}>
            <ProfileTracks track={track} user={user} key={track.trackPath} index={index}/>
          </MusicPlayerContextProvider>)
        })}
      </div>
    </div>
  )
}

export default Profile;