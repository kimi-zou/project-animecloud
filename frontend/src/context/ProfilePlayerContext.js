import React, { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";

import * as playerActions from "../store/player";

export const ProfilePlayerContext = React.createContext(); 

const ProfilePlayerContextProvider = ({ children }) => { 
  // Local states
  const [localWave, setLocalWave] = useState();
  const [localTime, setLocalTime]= useState(0);
  const [onPlay, setOnPlay] = useState(false);

  return (
    <ProfilePlayerContext.Provider value={{
      localWave, setLocalWave,
      localTime, setLocalTime,
      onPlay, setOnPlay
    }}>
      {children}
    </ProfilePlayerContext.Provider>
  )
}

export default ProfilePlayerContextProvider;