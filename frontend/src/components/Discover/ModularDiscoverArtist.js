import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Discover.css";
import "./ModularDiscoverArtist.css";
import * as userActions from "../../store/user";

const ModularDiscoverArtist = ({ artist }) => {
  let dispatch = useDispatch();

  // Local State
  const [showButton, setShowButton] = useState(false);

  //------------------ Helper Functions ---------------
  // 1. Redirect user to artist page
  const viewArtist = () => {
    dispatch(userActions.setCurrentViewUserUrl(artist)) 
    dispatch(userActions.setCurrentViewUser(artist))
  }

  return (
    <>
      <div className="discover__artist-container"
        onMouseEnter={()=>setShowButton(true)}
        onMouseLeave={()=>setShowButton(false)} 
      >
        <NavLink 
          to={`/${artist.username.toLowerCase()}`}
          className="discover__artist-link"
          onClick={viewArtist}
        >
          <div className="discover__artist-avatar" >
            <img src={artist.avatarImg} alt={"artist-avatar-img"}/>
          </div>
          <div className="discover__artist-display-name">{artist.displayName}</div>
        </NavLink>
        <div className="discover__artist-follow-container">
          { showButton && <button 
            className="discover__artist-follow" 
            type="button">
              <i className="fas fa-user-plus"></i>
              Follow
            </button>}
        </div>
      </div>  
    </>
  )
}

export default ModularDiscoverArtist;

