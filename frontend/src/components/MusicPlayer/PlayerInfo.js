import { useContext } from 'react';
import { MusicPlayerContext } from "../../context/MusicPlayerContext";

const PlayerInfo = () => {
  const { 
    tracks,
    currentSong
  } = useContext(MusicPlayerContext)

  return (
    <div className="player__track-info-session">
      <div className="track-info__cover">
        {tracks && tracks.length > 0 && <img className="track-info__cover-img" src={`${tracks[currentSong].coverImg}`} alt="test"/> }
      </div>
      <div className="track-info__name">
        {/* <div className="track-info__name-user">{user.displayName}</div> */}
        <div className="track-info__name-track">{tracks && tracks.length > 0 && tracks[currentSong].title}</div>
      </div>
    </div>
  )
};

export default PlayerInfo;