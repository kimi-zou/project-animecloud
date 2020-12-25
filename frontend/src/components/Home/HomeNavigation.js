// External dependencies
import React from "react";
import { NavLink } from "react-router-dom";

// Internal dependencies
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
import logo from "../../assets/logo/cloud.png";
import './Home.css';

//--------------------- Component ------------------------
const HomeNavigation = () => {
  return (
    <div className="home-nav">
      <NavLink exact to="/" className="home-nav__logo">
        <img className="logo__icon" src={logo} alt="AnimeCloud Logo"/>
        <div className="logo__text"><span>AnimeCloud</span></div>
      </NavLink>
      <div className="home-nav__auth">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    </div>
  )
}

export default HomeNavigation;