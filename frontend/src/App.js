// External dependencies
import React, { useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// Internal dependencies
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import UploadTrack from "./components/UploadTrack";
import Profile from "./components/Profile";

//--------------------- Component ------------------------
// Render order: component -> useEffect -> component 
function App() {
  const dispatch = useDispatch();

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user); // Render different Navbar

  let userurl = "";
  if(sessionUser) {
    userurl = sessionUser.username.toLowerCase();
  }

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
        <Route exact path="/">
          {!sessionUser && <Home />}
        </Route>
        <Route exact path="/discover">
          <h1>From discover</h1>
        </Route>
        <Route exact path={`/${userurl}/profile`}>
          {sessionUser && <Profile />}
        </Route>
        <Route exact path="/settings">
          <h1>Settings</h1>
        </Route>
        <Route exact path="/upload">
          <UploadTrack />
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
