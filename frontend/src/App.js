// External dependencies
import React, { useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

// Internal dependencies
import * as sessionActions from "./store/session";
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

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

  // Virtual DOM
  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
