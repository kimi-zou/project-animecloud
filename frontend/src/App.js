// External dependencies
import React, { useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// Internal dependencies
import * as sessionActions from "./store/session";
import * as trackActions from "./store/track";
import * as playerActions from "./store/player";
import * as userActions from "./store/user";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import UploadTrack from "./components/UploadTrack";
import Profile from "./components/Profile";
import MusicPlayer from "./components/MusicPlayer";
import Discover from "./components/Discover";

//--------------------- Component ------------------------
// Render order: component -> useEffect -> component 
function App() {
  const dispatch = useDispatch();

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user); 
  const userUrl= useSelector(state => state.user.userUrl);
  const tracks = useSelector(state => state.track.tracks);

  // When page first load, restore user
  // Get all tracks belong to that user
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then((res) => dispatch(userActions.setUserUrl(res)))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(trackActions.getTracks())
    dispatch(playerActions.setDefaultPlaylist(tracks))
  }, [sessionUser])

  // Virtual DOM
  return isLoaded && (
    <>
      {sessionUser && (
        <>
          <Navigation isLoaded={isLoaded}/>
          <MusicPlayer user={sessionUser} />
        </>
      )}
      <Switch>
        <Route exact path="/">
          {!sessionUser && <Home />}
        </Route>
        <Route exact path="/discover">
          {sessionUser && <Discover />}
        </Route>
        <Route exact path={`/${userUrl}/profile`}>
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
