// External dependencies
import React, { useState, useEffect }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";

// Internal dependencies
import * as sessionActions from '../../store/session';
import * as userActions from "../../store/user";
import "./ProfileButton.css";

//--------------------- Component ------------------------
const ProfileButton = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  //------------------ States ---------------
  const sessionUser = useSelector(state => state.session.user);
  const userUrl= useSelector(state => state.user.userUrl);
  const [showMenu, setShowMenu] = useState(false);

  //------------------ Helper Functions ---------------
  // 1. Open menu
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // 2. Close menu
  const closeMenu = () => setShowMenu(false);

  // 3. Logout
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  // 4. Set user url
  const clickProfile = () => dispatch(userActions.setUserUrl(sessionUser));

  //------------------ Event Listeners ---------------
   useEffect(() => {
    if (!showMenu) return; // If menu is opened, return
    document.addEventListener('click', closeMenu); // Click anywhere else, close menu
    // Clean up: close menu and remove event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

//--------------------- Component ------------------------
  return (
    <div className="nav-user">
      <button onClick={openMenu} className="nav-user__user">
        <div className="nav-user__avatar">
          <img src={sessionUser.avatarImg} alt="User Avatar"/>
        </div>
        {sessionUser.username}
      </button>
      {showMenu && (
        <ul className="nav-user__dropdown">
          <li>
            <NavLink to={`/${userUrl}/profile`} className="dropdown__options" onClick={clickProfile}>Profile</NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="dropdown__options">Settings</NavLink>
          </li>
          <li>
            <button onClick={logout} className="dropdown__logout">Log out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
