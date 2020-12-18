// External dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Internal dependencies
import LoginFormPage from './components/LoginFormPage';

//--------------------- Component ------------------------
function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
