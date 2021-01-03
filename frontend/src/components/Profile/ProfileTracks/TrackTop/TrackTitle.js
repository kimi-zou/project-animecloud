import { useSelector } from "react-redux";

const TrackTitle = ({ track }) => {
  // Global states
  const user = useSelector(state => state.user.currentViewUser); 

  return (
    <div className="profile-player__name">
      <div className="profile-player__name-user">{user.displayName}</div>
      <div className="profile-player__name-track">{track.title}</div>
    </div>
  )
}

export default TrackTitle;