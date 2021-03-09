// External dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

// Internal dependencies
import * as sessionActions from '../../store/session';
import logo from "../../assets/logo/cloud.png";
import "../Home/AuthForm.css";

//--------------------- Component ------------------------
const LoginForm = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  // States
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // Handler: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then((res) => {
        history.push("/discover");
      })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  }

  // Demo Login
  const demoLogin = async () => {
    await dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    history.push("/discover");
  }

  // Virtual DOM
  return (
    <>
      <form onSubmit={handleSubmit} className="auth__form">
        <div className="auth__logo">
          <img className="auth-logo__icon" src={logo} alt="AnimeCloud Logo"/>
          <div className="auth-logo__text"><span>AnimeCloud</span></div>
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="auth__error"><i className="fas fa-exclamation-circle"></i>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Username/Email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className="auth__input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth__input"
          required
        />
        <div className='login__buttons'>
          <button type="submit" className="login__login">Log In</button>
          <button type="button" className="login__login" onClick={demoLogin}>Demo Login</button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;