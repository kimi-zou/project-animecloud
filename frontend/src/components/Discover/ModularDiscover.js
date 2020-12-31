import { useSelector } from "react-redux";
import "./Discover.css";
import ModularDiscoverTrack from "./ModularDiscoverTrack";
import ModularDiscoverArtist from "./ModularDiscoverArtist";

//--------------------- Component ------------------------
const ModularDiscover = ({type, title, description}) => {
  //--------------------- States ------------------------
  const { popularArtists } = useSelector(state => state.user);
  const { recentReleasedTracks } = useSelector(state => state.track);

  //--------------------- Component ------------------------
  return (
    <div className="discover__modular-container">
      <div className="discover__modular-title">{title}</div>
      <div className="discover__modular-description">{description}</div>
      <div className="discover__modular-content">
        {type === "track" && recentReleasedTracks && recentReleasedTracks.map((track, index) => 
        <ModularDiscoverTrack track={track} index={index} key={track.id}/>
      )}
        {type === "artist" && popularArtists && popularArtists.map((artist, index) => 
        <ModularDiscoverArtist artist={artist} index={index} key={artist.id}/> 
      )}
      </div>
      
    </div>
  )
}

export default ModularDiscover;