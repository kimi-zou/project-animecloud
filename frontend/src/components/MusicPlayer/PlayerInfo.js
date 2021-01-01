import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import { useSelector } from "react-redux";


const PlayerInfo = () => {
  const playerState = useSelector(state => state.player); 
  const currentViewUser = useSelector(state => state.user.currentViewUser); 
  const currentSong = playerState.currentSong;

  return (
    <div className="player__track-info-session"> 
      <div className="track-info__cover">
        {currentSong.id > -1 && <img className="track-info__cover-img" src={currentSong.coverImg} alt="current song cover"/>}
      </div>
      <div className="track-info__name">
        <div className="track-info__name-user">{currentViewUser.displayName}</div>
        <div className="track-info__name-track">{currentSong && currentSong.title}</div>
      </div>
    </div>
  )
};

export default PlayerInfo;