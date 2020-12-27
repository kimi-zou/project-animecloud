const ProfileMeta = ({ user }) => {
  return (
    <div className="profile__meta">
      <div className="meta__menu">Tracks</div>
      <div className="meta__info">
        <div className="meta__info-followers meta__info-container">
          <span className="meta__info-label">Followers</span>
          <span className="meta__info-value">1</span>
        </div>
        <div className="meta__info-followings meta__info-container">
          <span className="meta__info-label">Following</span>
          <span className="meta__info-value">1</span>
        </div>
        <div className="meta__info-tracks meta__info-container">
          <span className="meta__info-label">Tracks</span>
          <span className="meta__info-value">1</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileMeta;