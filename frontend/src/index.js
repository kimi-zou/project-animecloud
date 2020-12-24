// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

// Internal dependencies
import './index.css';
import App from './App';
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
    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
};

//-----------------------------------------------
// Render virtual DOM
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
