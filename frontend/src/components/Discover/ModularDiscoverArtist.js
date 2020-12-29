import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Discover.css";
import * as userActions from "../../store/user";


const ModularDiscoverArtist = ({title, description}) => {
  const dispatch = useDispatch();
  //---------------- State -------------------
  // Global
  const userUrl= useSelector(state => state.user.userUrl);
  // Local
  const [showFollow, setShowFollow] = useState(false);

  dispatch(userActions.getPopularArtists());

  //-------------- Component -----------------
  return (
    <>
      <NavLink 
        to={`/${userUrl}/profile`} 
        onMouseEnter={() => setShowFollow(true)}
        onMouseLeave={() => setShowFollow(false)}
      >
        <div className="discover__artist-avatar"></div>
        <div className="discover__artist-display-name"></div>
      </NavLink>
      {showFollow && <button type="button"></button>}
    </>
  )
}

export default ModularDiscoverArtist;