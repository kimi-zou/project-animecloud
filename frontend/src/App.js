// External dependencies
import React, { useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

// Internal dependencies
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from "./store/session";

//--------------------- Component ------------------------
function App() {
  const dispatch = useDispatch();

  // State
  const [isLoaded, setIsLoaded] = useState(false);

  // Hook: useEffect
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
