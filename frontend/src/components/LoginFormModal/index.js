import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import "../Home/Home.css";

//---------------------------------------------------
const LoginFormModal = () => {
  //state
  const [showModal, setShowModal] = useState(false);

  //Virtual DOM
  return (
    <>
      <button onClick={() => {
        setShowModal(true)
      }} className="auth__buttons auth__login">Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/> 
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;