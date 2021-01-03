import MusicPlayerContextProvider from "../../../context/MusicPlayerContext";
import { useState } from "react";

import TrackCover from "./TrackCover";
import TrackTop from "./TrackTop/index";
import TrackMiddle from "./TrackMiddle/index";
import TrackBottom from "./TrackBottom/index";

import "../Profile.css"; 

// --------------------------------------------------------------------
const ProfileTracks = ({ track, index }) => {
    // Local states
    const [localWave, setLocalWave] = useState();
    const [onPlay, setOnPlay] = useState(false);

  return (
    <div className="profile-track">
      <TrackCover track={track}/>
      <div className="profile-track__music-player">
        <MusicPlayerContextProvider key={index}>
          <TrackTop track={track} localWave={localWave} onPlay={onPlay} setOnPlay={setOnPlay}/>
          <TrackMiddle track={track} index={index} setLocalWave={setLocalWave}/>
        </MusicPlayerContextProvider>
        <TrackBottom />
      </div>
    </div>
  )
}

export default ProfileTracks;