import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Discover.css";
import "./ModularDiscoverTrack.css";

//--------------------- Component ------------------------
const ModularDiscoverTrack = ({ track }) => {
  const artist = track.User;

  // Local State
  const [showButton, setShowButton] = useState(false);

  //--------------------- Helper Functions ------------------------
  // 1. Redirect user to artist page  
  const onHover = () => {
    // setShowButton(true)
  }

  const offHover = () => {
    setShowButton(false)
  }

  return (
    <>
      <div className="discover__artist-container">
        <div className="discover__track-cover"
             onMouseEnter={onHover}
             onMouseLeave={offHover}>
          <img 
            src={track.coverImg} 
            alt={"track-cover-img"} 
          />
          {
            showButton && 
            <div className="discover__track-play-container">
              <button className="discover__track-play" type="button">
                <i className="fas fa-play-circle fa-4x"></i>
              </button> 
            </div>
          }
        </div>
        <div className="discover__track-title">{track.title}</div>
        <NavLink 
          className="discover__track-artist-name"
          to={`/users/${artist.username}`}
        >
          {artist.displayName}
        </NavLink>
      </div>  
    </>
  )
}

export default ModularDiscoverTrack;