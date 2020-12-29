import "./Discover.css";

//--------------------- Component ------------------------
const ModularDiscoverTrack = ({title, description}) => {
  return (
    <div className="discover__modular-container">
      <div className="discover__modular-title">{title}</div>
      <div className="discover__modular-description">{description}</div>
    </div>
  )
}

export default ModularDiscoverTrack;