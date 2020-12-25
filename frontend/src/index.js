// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

// Internal dependencies
import './index.css';
import App from './App';
import { ModalProvider } from "./context/Modal";
import configureStore from "./store";
import { restoreCSRF, fetch } from "./store/csrf";
import * as sessionActions from './store/session';

//-----------------------------------------------
// Expose store to window
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF(); // Get csrf token when app loaded
  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
};

//-----------------------------------------------
// Root Component 
const Root = () => {
  return (
    <ModalProvider>
      <Provider store = {store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  )
};

//-----------------------------------------------
// Render virtual DOM
ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
