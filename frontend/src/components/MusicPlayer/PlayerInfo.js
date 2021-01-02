import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import { useSelector } from "react-redux";


const PlayerInfo = () => {
  const currentSong = useSelector(state => state.player.currentSong); 
  const currentViewUser = useSelector(state => state.user.currentViewUser); 
  // console.log(currentSong);

  return (
    <div className="player__track-info-session"> 
      <div className="track-info__cover">
        {currentSong.id > -1 && <img className="track-info__cover-img" src={currentSong.coverImg} alt="current song cover"/>}
      </div>
      <div className="track-info__name">
        <div className="track-info__name-user">{currentViewUser.displayName}</div>
        <div className="track-info__name-track">{currentSong.id > -1 && currentSong.title}</div>
      </div>
    </div>
  )
};

export default PlayerInfo;