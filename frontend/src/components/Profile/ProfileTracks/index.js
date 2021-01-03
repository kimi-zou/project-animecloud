import MusicPlayerContextProvider from "../../../context/MusicPlayerContext";
import ProfilePlayerContextProvider from "../../../context/ProfilePlayerContext";
import { useState } from "react";

import TrackCover from "./TrackCover";
import TrackTop from "./TrackTop/index";
import TrackMiddle from "./TrackMiddle/index";
import TrackBottom from "./TrackBottom/index";

import "../Profile.css"; 

// --------------------------------------------------------------------
const ProfileTracks = ({ track, index }) => {
  return (
    <div className="profile-track">
      <TrackCover track={track}/>
      <div className="profile-track__music-player">
        <MusicPlayerContextProvider>
          <ProfilePlayerContextProvider>
            <TrackTop track={track} />
            <TrackMiddle track={track} index={index} />
          </ProfilePlayerContextProvider>
        </MusicPlayerContextProvider>
        <TrackBottom />
      </div>
    </div>
  )
}

export default ProfileTracks;