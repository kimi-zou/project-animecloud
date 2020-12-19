// External dependencies
import React, { useState, useEffect }  from "react";
import { useDispatch } from 'react-redux';

// Internal dependencies
import * as sessionActions from '../../store/session';

//--------------------- Component ------------------------
const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();

  // State
  const [showMenu, setShowMenu] = useState(false);

  // Helper function
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // Hook: useEffect
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Handler: logout
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // Virtual DOM
  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
