// External dependencies
import React, { useState, useEffect }  from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";

// Internal dependencies
import * as sessionActions from '../../store/session';
import "./ProfileButton.css";

//--------------------- Component ------------------------
const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  // State
  const [showMenu, setShowMenu] = useState(false);

  // Hook: useEffect
  useEffect(() => {
    if (!showMenu) return; // If menu is opened, return

    // Helper function
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu); // Click anywhere else, close menu

    // Clean up: close menu and remove event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  //-----------------------------------------
  // Handler: open menu
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // Handler: logout
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  // Virtual DOM
  return (
    <div className="nav-user">
      <button onClick={openMenu} className="nav-user__user">
        <i className="fas fa-user-circle" />
        {user.username}
      </button>
      {showMenu && (
        <ul className="nav-user__dropdown">
          <li>
            <NavLink to="/profile" className="dropdown__options">Profile</NavLink>
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
