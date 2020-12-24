// External dependencies
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Internal dependencies
import './Home.css';
import logo from "../../assets/logo/cloud.png";

//--------------------- Component ------------------------
const HomeNavigation = () => {
  return (
    <div className="home-nav">
      <NavLink className="home-nav__logo" exact to="/">
        <img className="logo__icon" src={logo} />
        <div className="logo__text"><span>AnimeCloud</span></div>
      </NavLink>
      <div className="home-nav__auth">
        <NavLink className="auth__buttons auth__login " to="/login">Log In</NavLink>
        <NavLink className="auth__buttons auth__signup" to="/signup">Sign Up</NavLink>
      </div>
    </div>
  )
}

export default HomeNavigation;