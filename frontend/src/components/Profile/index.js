import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import * as userActions from "../../store/user";
import MusicPlayerContextProvider from "../../context/MusicPlayerContext";
import ProfileHeader from "./ProfileHeader";
import ProfileMeta from "./ProfileMeta";
import ProfileTracks from "./ProfileTracks";
import "./Profile.css";


//-----------------------------------------------------
const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  
  // States
  const user = useSelector(state => state.user.currentViewUser); 

  // Set current view user
  useEffect(() => {
    dispatch(userActions.getCurrentViewUser(username))
  }, [username])

  return (
    <div className="profile__outer-container">
      <div className="profile__inner-container">
        <ProfileHeader user={user}/>
        <ProfileMeta user={user} tracks={user.Tracks}/>
        {user && user.Tracks.map((track, index) => { 
        return (<MusicPlayerContextProvider key={index}>
            <ProfileTracks track={track} user={user} key={track.trackPath} index={index}/>
          </MusicPlayerContextProvider>)
        })}
      </div>
    </div>
  )
}

export default Profile;