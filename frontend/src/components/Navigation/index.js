// External dependencies
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Internal dependencies
import ProfileButton from './ProfileButton';
import './Navigation.css';

//--------------------- Component ------------------------
const Navigation = ({ isLoaded }) => {
  // State
  const sessionUser = useSelector(state => state.session.user);

  // Base on state, render different components
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (<ProfileButton user={sessionUser} />);
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  // Virtual DOM
  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
