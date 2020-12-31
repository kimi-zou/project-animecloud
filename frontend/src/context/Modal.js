import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

//------------------------ Context -----------------------
const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  // useRef returns a mutable ref object whose .current property 
  // is initialized to the passed argument. 
  const modalRef = useRef();

  // state
  const [value, setValue] = useState();

  // run after render
  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      {/* modalRef.current points to this div */}
      <div ref={modalRef} /> 
    </>
  );
};


//--------------------- A Modal Component ----------------------------

export const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext); // An HTML DOM Node 

  if (!modalNode) return null; // If no context value exists, return

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode // Render the above inside this HTML DOM Node 
  );
};