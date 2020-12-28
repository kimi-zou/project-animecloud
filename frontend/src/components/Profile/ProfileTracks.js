import { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import "./Profile.css";

// --------------------------------------------------------------------
const ProfileTracks = ({ user, track, index }) => {
  // States
  const [ wave, setWave ] = useState();
  const [ play, setPlay ] = useState(false);
  const [ playProgress, setPlayProgress ] = useState();

  // Player waveform
  useEffect(() => { 
    const wavesurfer = WaveSurfer.create({
      container: `#waveform-${index}`,
      waveColor: '#999',
      progressColor: '#f50',
      barHeight: "1",
      barWidth: "3",
      height: "110",
      backend: "MediaElementWebAudio"
    });

    setWave(wavesurfer);
    
  }, [index]);

  useEffect(()=>{
    if(wave) wave.play();
    if(wave && !play) wave.pause();
  }, [play])
  

  // Handle play
  const clickPlay = () => {
    setPlay(true);
  }

  const clickPause = () => {

    setPlayProgress(wave.getCurrentTime()/wave.getDuration());
    setPlay(false);
  }

  if(wave) wave.load(`/uploads/tracks/${track.trackPath}`); 

  // Calculate track release time
  const calTime = () => {
    const currentTime = Date.now();
    const trackCreatedTime = new Date(track.updatedAt);
    const timeDifference = (currentTime - trackCreatedTime)/(1000*3600*24);
    const releaseTime = Math.floor(timeDifference);
    if(releaseTime < 1) return "less than 1 day";
    return `${releaseTime} days ago`;
  }

  return (
    <div className="profile-track">
      <div className="profile-track__cover">
        <img className="profile-track__cover-img" src={`/uploads/covers/${track.coverImg}`} alt="test"/>
      </div>
      <div className="profile-track__music-player">
        <div className="profile-player__top">
          <div className="profile-player__top-left">
            <div className="profile-player__play-icon">
              {!play && 
                <i 
                  className="fas fa-play-circle fa-4x" 
                  id={`play-${index}`} 
                  onClick={clickPlay}
                />
              }
              {play && 
                <i 
                  className="fas fa-pause-circle fa-4x" 
                  id={`pause-${index}`} 
                  onClick={clickPause}
                />
              }
              
            </div>
            <div className="profile-player__name">
              <div className="profile-player__name-user">{user.displayName}</div>
              <div className="profile-player__name-track">{track.title}</div>
            </div>
          </div>
          <div className="profile-player__date">{calTime()}</div>
        </div>
        <div className="profile-player__middle" id={`waveform-${index}`}>
        </div>
        <div className="profile-player__bottom">
          <i className="fas fa-heart"></i>
          <i className="fas fa-comment-alt"></i>
        </div>
      </div>
    </div>
  )
}

export default ProfileTracks;