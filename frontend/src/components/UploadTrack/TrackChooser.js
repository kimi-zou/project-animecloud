const TrackChooser = ({ handleChange }) => {
  return (
    <div className="upload__outer-container">
      <div className="upload__inner-container">
        <h1 className="upload__heading">Upload your track here</h1>
        <div className="upload__file-chooser">
          <label className="file-choose__input">
            choose files to upload
            <input 
              type="file" 
              accept=".wav,.flac,.aiff,.alac,.ogg,.mp3,.mp2,.aac,.amr,.wma,.m4a"
              onChange={handleChange} 
            />
          </label>
        </div>
        <p className="upload__note">Recommend to upload lossless format: WAV, FLAC, AIFF, or ALAC</p>
      </div>
    </div>
  )
}

export default TrackChooser;