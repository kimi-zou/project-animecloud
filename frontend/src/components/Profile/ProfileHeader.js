import { useSelector } from 'react-redux';

const ProfileHeader = () => {
  // States
  const user = useSelector(state => state.user.currentViewUser); 

  return (
    <div className="profile__header">
      <div className="profile-header__avatar">
        {user.avatarImg && <img src={user.avatarImg} className="profile-header__avatar-img" alt="user avatar"/>}
      </div>
      <div className="profile-header__user">
        <h3 className="profile-header__user-display-name">{user.displayName || user.username}</h3>
        <button className="profile-header__follow" type="button">Follow</button>
      </div>
    </div>
  )
}

export default ProfileHeader;
