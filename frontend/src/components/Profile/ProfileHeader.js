const ProfileHeader = ({ user }) => {
  return (
    <div className="profile__header">
      <div className="profile-header__avatar">
        <img src={user.avatarImg} className="profile-header__avatar-img" alt="user avatar"/>
      </div>
      <div className="profile-header__user">
        <h3 className="profile-header__user-display-name">{user.displayName}</h3>
        <button className="profile-header__follow" type="button">Follow</button>
      </div>
    </div>
  )
}

export default ProfileHeader;
