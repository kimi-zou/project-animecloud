import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Discover.css";
import "./ModularDiscoverArtist.css";

const ModularDiscoverArtist = ({ artist }) => {
  // Local State
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <div className="discover__artist-container"
        // onMouseEnter={()=>setShowButton(true)}
        // onMouseLeave={()=>setShowButton(false)} 
      >
        <NavLink 
          to={`/users/${artist.username}`}
          className="discover__artist-link"
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

