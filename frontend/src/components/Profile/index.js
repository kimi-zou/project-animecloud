// import { useState } from 'react';
import { useSelector } from 'react-redux';

import ProfileHeader from "./ProfileHeader";
import ProfileMeta from "./ProfileMeta";
import ProfileTracks from "./ProfileTracks";
import "./Profile.css";


//-----------------------------------------------------
const Profile = () => {
  // State
  const user = useSelector(state => state.session.user);
  const tracks = useSelector(state => state.track.tracks);

  return (
    <div className="profile__outer-container">
      <div className="profile__inner-container">
        <ProfileHeader user={user}/>
        <ProfileMeta user={user}/>
        {tracks.map((track, index) => { 
          return <ProfileTracks track={track} user={user} key={track.trackPath} index={index}/>
        })}
      </div>
    </div>
  )
}

export default Profile;