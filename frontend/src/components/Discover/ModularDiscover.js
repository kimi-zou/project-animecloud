import "./Discover.css";
import ModularDiscoverTrack from "./ModularDiscoverTrack";
import ModularDiscoverArtist from "./ModularDiscoverArtist";


//--------------------- Component ------------------------
const ModularDiscover = ({type, title, description}) => {
  return (
    <div className="discover__modular-container">
      <div className="discover__modular-title">{title}</div>
      <div className="discover__modular-description">{description}</div>
      {type === "track" && <ModularDiscoverTrack />}
      {type === "artist" && <ModularDiscoverArtist />}
    </div>
  )
}

export default ModularDiscover;