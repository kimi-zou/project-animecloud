// External dependencies
import React, { useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// Internal dependencies
import * as sessionActions from "./store/session";
import * as trackActions from "./store/tracks";
import * as playerActions from "./store/player";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import UploadTrack from "./components/UploadTrack";
import Profile from "./components/Profile";
import MusicPlayer from "./components/MusicPlayer";

//--------------------- Component ------------------------
// Render order: component -> useEffect -> component 
function App() {
  const dispatch = useDispatch();

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioContext, setAudioContext] = useState();
  const sessionUser = useSelector(state => state.session.user); 

  // Dynamic display url
  let userurl = "";
  if(sessionUser) {
    userurl = sessionUser.username.toLowerCase();
  }

  // When page first load, restore user
  // Get all tracks belong to that user
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then((res) => {
        if(res) {
          dispatch(trackActions.getTracks())
            .then((res) => dispatch(playerActions.setDefaultPlaylist(res)))
            .then(() => setAudioContext(new AudioContext()))
        }
      })
      .then(() => setIsLoaded(true)); 
  }, [dispatch]);

  // Virtual DOM
  return isLoaded && (
    <>
      {sessionUser && <Navigation isLoaded={isLoaded}/>}
      {sessionUser && <MusicPlayer audioContext={audioContext}/>}
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
          <UploadTrack user={sessionUser}/>
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
