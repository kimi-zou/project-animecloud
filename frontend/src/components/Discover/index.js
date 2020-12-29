import ModularDiscover from "./ModularDiscover";
import "./Discover.css";

//--------------------- Component ------------------------
const Discover = () => {
  return (
    <div className="discover__outer-container">
      <ModularDiscover 
        type="track"
        title="New Releases"
        description="Discover the latest music"
      />
      <ModularDiscover 
        type="artist"
        title="Popular Artists"
        description="The biggest sounds on AnimeCloud"
      />
    </div>
  )
}

export default Discover;