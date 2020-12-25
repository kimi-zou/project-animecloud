// External dependencies
import React, { useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// Internal dependencies
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Home from "./components/Home";

//--------------------- Component ------------------------
// Render order: component -> useEffect -> component 
function App() {
  const dispatch = useDispatch();

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user); // Render different Navbar

  // Hook: useEffect
  useEffect(() => {
    dispatch(sessionActions.restoreUser()) 
    .then(() => setIsLoaded(true));
  }, [dispatch]);


  // Virtual DOM
  return isLoaded && (
    <>
      {sessionUser && <Navigation isLoaded={isLoaded}/>}
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
