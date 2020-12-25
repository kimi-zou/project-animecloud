import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

//----------------------------------------------------
// Create a Context Object
const ModalContext = React.createContext();

// Create a provider of the context
export const ModalProvider = ({ children }) => {
  // useRef returns a mutable ref object whose .current property is initialized to the passed argument 
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
      {/* modalRef.current will be set to the actual HTML DOM element that gets rendered from the div */}
      <div ref={modalRef} />
    </>
  );
};

// Component: will use context
export const Modal = ({ onClose, children }) => {
  // Extract context value: the actual DOM node for modal to mount
  const modalNode = useContext(ModalContext);

  // If no context value exists, return
  if (!modalNode) return null;

  // 
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
};