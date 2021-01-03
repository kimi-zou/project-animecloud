import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import * as userActions from "../../store/user";
import ProfileHeader from "./ProfileHeader";
import ProfileMeta from "./ProfileMeta";
import ProfileTracks from "./ProfileTracks/index";
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
        <ProfileHeader />
        <ProfileMeta />
        {user && user.Tracks.map((track, index) => 
          <ProfileTracks track={track} key={track.id} index={index}/>
        )}
      </div>
    </div>
  )
}

export default Profile;