// External dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Internal dependencies
import * as sessionActions from '../../store/session';
import "./LoginForm.css";

//--------------------- Component ------------------------
const LoginForm = () => {
  const dispatch = useDispatch();

  // States
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // Handler: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  }

  // Virtual DOM
  return (
    <>
      <form onSubmit={handleSubmit} className="login__form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="login__error"><i className="fas fa-exclamation-circle"></i>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Username / Email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className="login__input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login__input"
          required
        />
        <button type="submit" className="login__submit">Log In</button>
      </form>
    </>
  );
}

export default LoginForm;