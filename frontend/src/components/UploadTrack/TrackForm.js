import React, { useState } from "react";

const TrackForm = ({ setDisplayForm, files }) => {
  // State
  const [title, setTitle] = useState(files.name);

  // Handlers
  const handleSubmit = () => {}

  // Component
  return (
    <div className="upload__outer-container form__outer-container">
      <div className="upload__inner-container form__container">
        <div className="form__heading">Track info</div>
        <form onSubmit={handleSubmit} className="form" id="track-form">
          <div className="form__cover">
            <div className="cover__display"></div>
            <label className="cover-choose__input">
              <i className="fas fa-camera"></i>
              Upload image
              <input 
                type="file" 
                accept=".png,.jpg,.jpeg"
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