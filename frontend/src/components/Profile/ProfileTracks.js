import "./Profile.css";

const ProfileTracks = ({ user, track }) => {
  // Calculate track release time
  const calTime = () => {
    const currentTime = Date.now();
    const trackCreatedTime = new Date(track.updatedAt);
    const timeDifference = (currentTime - trackCreatedTime)/(1000*3600*24);
    const releaseTime = Math.floor(timeDifference);
    if(releaseTime < 1) return "less than 1 day";
    return `${releaseTime} days ago`;
  }


  // res.data.tracks[0].coverImg
  console.log(track);

  return (
    <div className="profile-track">
      <div className="profile-track__cover">
        <img className="profile-track__cover-img" src={`/uploads/covers/${track.coverImg}`} alt="test"/>
      </div>
      <div className="profile-track__music-player">
        <div className="profile-player__top">
          <div className="profile-player__top-left">
            <div className="profile-player__play-icon">
              <i className="fas fa-play-circle fa-4x"></i>
            </div>
            <div className="profile-player__name">
              <div className="profile-player__name-user">{user.displayName}</div>
              <div className="profile-player__name-track">{track.title}</div>
            </div>
          </div>
          <div className="profile-player__date">{calTime()}</div>
        </div>
        <div className="profile-player__middle"></div>
        <div className="profile-player__bottom">
          <i className="fas fa-heart"></i>
          <i class="fas fa-comment-alt"></i>
        </div>
      </div>
    </div>
  )
}

export default ProfileTracks;