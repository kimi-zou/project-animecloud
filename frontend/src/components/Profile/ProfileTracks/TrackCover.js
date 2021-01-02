const TrackCover = ({ track }) => {
  return (
    <div className="profile-track__cover">
      {track.coverImg && 
        <img className="profile-track__cover-img" 
        src={`${track.coverImg}`} 
        alt="track cover"/>
      }
    </div>
  )
}

export default TrackCover;