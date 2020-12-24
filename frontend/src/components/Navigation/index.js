// External dependencies
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Internal dependencies
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../assets/logo/cloud.png";

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
      <div className="nav__auth">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }
  
  // Virtual DOM
  return (
    <div className="nav">
      <NavLink className="nav__logo" exact to="/">
        <img className="nav__logo-icon" src={logo} />
        <div className="nav__logo-text"><span>AnimeCloud</span></div>
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
