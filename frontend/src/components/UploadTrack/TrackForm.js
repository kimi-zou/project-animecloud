import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import * as trackActions from "../../store/track";
import * as playerActions from "../../store/player";

//-----------------------------------------------------
const TrackForm = ({ setDisplayForm, trackData, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Remove extension from track name
  const name = trackData.name.replace(/\.[^/.]+$/, "");

  // State
  const [title, setTitle] = useState(name);
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState();

  // Handlers -----------------------------------------
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("trackFile", trackData);
    data.append("trackTitle", title);
    data.append("trackDescription", description);
    data.append("trackCover", cover);

    // for (let pair of data.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // } // Debug

    const res = await fetch("/api/tracks/create", {
      method: "POST",
      headers: {
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
      body: data,
    });

    if (res.ok) {
      dispatch(trackActions.getTracks())
        .then((res) => dispatch(playerActions.setDefaultPlaylist(res)));
    }

    history.push(`/${user.username}/profile`);
  }

  // Preview cover image
  const readUrl = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('cover-preview').src = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Component -----------------------------------------
  return (
    <div className="upload__outer-container form__outer-container">
      <div className="upload__inner-container form__container">
        <div className="form__heading">Track info</div>
        <form 
          id="track-form"
          className="form" 
          onSubmit={handleSubmit} 
        >
          <div className="form__cover">
            <div className="cover__display">
              {cover && <img id="cover-preview" alt="cover-preview"/>}
            </div>
            <label className="cover-choose__input">
              <i className="fas fa-camera"></i>
              Upload image
              <input 
                name="cover"
                type="file" 
                accept=".png,.jpg,.jpeg"
                onChange={(e) => {readUrl(e.target); setCover(e.target.files[0])}}
              />
            </label>
          </div>
          <div className="form__info">
            <div className="info__div">
              <label className="info__label">
                <span className="label__text">Title</span>
              </label>
              <input 
                className="info__input" 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="info__div">
              <label className="info__label">Description</label>
              <textarea 
                className="info__textarea info__input" 
                placeholder="Describe your track"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="form__footer">
          <div className="footer__note">
            <span className="note__text">Required fields</span>
          </div>
          <div className="form__buttons">
            <button type="button" className="form__button-cancel form__buttons" onClick={() => setDisplayForm(false)}>Cancel</button>
            <button type="submit" form="track-form" className="form__button-save form__buttons">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackForm;