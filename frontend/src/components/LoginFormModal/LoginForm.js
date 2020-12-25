// External dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

// Internal dependencies
import * as sessionActions from '../../store/session';
import logo from "../../assets/logo/cloud.png";
import "../Home/AuthForm.css";

//--------------------- Component ------------------------
const LoginForm = ({ setShowModal }) => {
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
        setShowModal(false);
        history.push("/discover");
      })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
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
        <button type="submit" className="auth__submit">Log In</button>
      </form>
    </>
  );
}

export default LoginForm;