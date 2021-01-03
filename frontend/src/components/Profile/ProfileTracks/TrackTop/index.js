import TrackPlayPause from "./TrackPlayPause";
import TrackTitle from "./TrackTitle";

const TrackTop = ({ track }) => {

  const calTime = () => {
    const currentTime = Date.now();
    const trackCreatedTime = new Date(track.updatedAt);
    const timeDifference = (currentTime - trackCreatedTime)/(1000*3600*24);
    const releaseTime = Math.floor(timeDifference);
    if(releaseTime < 1) return "less than 1 day";
    return `${releaseTime} days ago`;
  }

  return (
    <div className="profile-player__top">
      <div className="profile-player__top-left">
        <TrackPlayPause track={track}/>
        <TrackTitle track={track}/>
      </div>
      <div className="profile-player__date">{calTime()}</div>
    </div>
  )
}

export default TrackTop;