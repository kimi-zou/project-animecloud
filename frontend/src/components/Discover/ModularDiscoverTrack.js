import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Discover.css";
import "./ModularDiscoverTrack.css";
import * as userActions from "../../store/user";

//--------------------- Component ------------------------
const ModularDiscoverTrack = ({ track }) => {
  let dispatch = useDispatch();
  const artist = track.User;

  // Local State
  const [showButton, setShowButton] = useState(false);

  //--------------------- Helper Functions ------------------------
  // 1. Redirect user to artist page
  const viewArtist = () => {
    dispatch(userActions.setCurrentViewUserUrl(artist)) 
    dispatch(userActions.setCurrentViewUser(artist))
  }
  
  const onHover = () => {
    setShowButton(true)
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
                <i className="fas fa-user-plus" />Follow
              </button> 
            </div>
          }
        </div>
        <div className="discover__track-title">{track.title}</div>
        <NavLink 
          className="discover__track-artist-name"
          to={`/${artist.username.toLowerCase()}`}
          onClick={viewArtist}
        >
          {artist.displayName}
        </NavLink>
      </div>  
    </>
  )
}

export default ModularDiscoverTrack;