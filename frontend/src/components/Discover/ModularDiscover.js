import { useSelector } from "react-redux";
import "./Discover.css";
import ModularDiscoverArtist from "./ModularDiscoverArtist";

//--------------------- Component ------------------------
const ModularDiscover = ({type, title, description}) => {
  const { popularArtists } = useSelector(state => state.user);
  return (
    <div className="discover__modular-container">
      <div className="discover__modular-title">{title}</div>
      <div className="discover__modular-description">{description}</div>
      <div className="discover__modular-content">
        {type === "track" && popularArtists && popularArtists.map((artist, index) => 
        <ModularDiscoverArtist artist={artist} index={index}/>
      )}
        {type === "artist" && popularArtists && popularArtists.map((artist, index) => 
        <ModularDiscoverArtist artist={artist} index={index}/>
      )}
      </div>
      
    </div>
  )
}

export default ModularDiscover;