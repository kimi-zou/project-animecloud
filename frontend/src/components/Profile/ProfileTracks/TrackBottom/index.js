import { useSelector } from "react-redux";

const TrackBottom = () => {
  const sessionUser = useSelector(state => state.session.user); 
  const user = useSelector(state => state.user.currentViewUser);

  return (
    <div className="profile-player__bottom">
      {sessionUser.id === user.id && 
        <div className="profile-player__edits">
          <button type="button" className="profile-player__edit-button profile-player__edit-buttons">Edit</button>
          <button type="button" className="profile-player__delete-button profile-player__edit-buttons">Delete</button>
        </div>}
      <div></div>
      <div className="profile-player__likes-comments">
        <i className="fas fa-heart"></i>
        <i className="fas fa-comment-alt"></i>
      </div>
    </div>
  )
}

export default TrackBottom;