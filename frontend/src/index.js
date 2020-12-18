// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Internal dependencies
import './index.css';
import App from './App';
import configureStore from "./store";

// Expose store to window
const store = configureStore();
if (process.env.NODE_ENV !== "production") {
  window.store = store;
};

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

// Render virtual DOM
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
