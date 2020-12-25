import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import "../Home/Home.css";

//---------------------------------------------------
const SignupFormModal = () => {
  //state
  const [showModal, setShowModal] = useState(false);

  //Virtual DOM
  return (
    <>
      <button onClick={() => {
        setShowModal(true)
      }} className="auth__buttons auth__signup">Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;