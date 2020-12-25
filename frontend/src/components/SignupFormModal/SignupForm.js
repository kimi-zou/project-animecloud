// External dependencies
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Internal dependencies
import * as sessionActions from "../../store/session";
import logo from "../../assets/logo/cloud.png";
import "../Home/AuthForm.css";

//--------------------- Component ------------------------
const SignupFormPage = ({ setShowModal }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  // State
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  // Handler: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .then((res) => {
          setShowModal(false);
          history.push("/discover");
        })
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

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
            <li key={idx} className="auth__error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </li>))}
        </ul>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth__input"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="auth__input"
          required
        />
        <button type="submit" className="auth__submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
