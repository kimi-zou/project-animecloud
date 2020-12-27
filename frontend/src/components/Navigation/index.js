// External dependencies
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

// Internal dependencies
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../assets/logo/cloud.png";

//--------------------- Component ------------------------
const Navigation = ({ isLoaded }) => {

  // State
  // const sessionUser = useSelector(state => state.session.user);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Handler: submit
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // Virtual DOM
  return (
    <header className="header">
      <div className="nav">
        <div className="nav-left">
          <NavLink className="nav-logo" exact to="/discover">
            <img className="nav-logo__icon" src={logo} alt="AnimeCloud Logo"/>
          </NavLink>
          <NavLink className="nav-menu__discover" exact to="/discover">
            Discover
          </NavLink>
          <div className="nav-search">
            <form className="nav-search__form" onSubmit={handleSubmit}>
              <input 
                className="nav-search__input" 
                placeholder="Search"
                type="search"
                name="search"
                onChange={(e) => setSearchKeyword(e.target.value)}
                value={searchKeyword}
              />
              <button className="nav-search__submit" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="nav-right">
          <NavLink className="nav-upload" exact to="/upload">Upload</NavLink>
          {isLoaded && <ProfileButton />}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
