import React, { useState } from "react";

import TrackChooser from "./TrackChooser";
import TrackForm from "./TrackForm";
import "./UploadTrack.css";

//--------------------- Component ------------------------
const UploadTrack = ({ user }) => {
  // States
  const [trackData, setTrackData] = useState();
  const [displayForm, setDisplayForm] = useState(false);

  // Handler
  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setDisplayForm(true);
    setTrackData(file);
  }

  // Component
  return (
    <>
      {(!displayForm) && <TrackChooser handleChange={handleChange}/>}
      {(displayForm) && <TrackForm setDisplayForm={setDisplayForm} trackData={trackData} user={user} />}
    </>
    
  )
}

export default UploadTrack;