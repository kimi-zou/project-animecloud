//---------------- State -------------------
const initialState = { 
  currentSong: 0,
  songs: null,
  repeat: false,
  random: false,
  playing: false,
  // audio: null
};

// Action Types:
const SET_DEFAULT_PLAYLIST = "SET_DEFAULT_PLAYLIST";
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
const TOGGLE_RANDOM = 'TOGGLE_RANDOM';
const TOGGLE_REPEAT = 'TOGGLE_OPTIONS';
const TOGGLE_PLAYING = 'TOGGLE_PLAYING';

// POJO actions:
// 0. Set default playlist songs
export const setDefaultPlaylist = (songs) => ({
  type: SET_DEFAULT_PLAYLIST,
  payload: songs
})

// 1. Set current song
export const setCurrentSong = (index) => ({
  type: SET_CURRENT_SONG,
  payload: index
})

// 2. Toggle random state
export const toggleRandom = (state) => ({
  type: TOGGLE_RANDOM,
  payload: state.random ? false : true
})

// 3. Toggle repeat state
export const toggleRepeat = (state) => ({
  type: TOGGLE_REPEAT,
  payload: state.repeat ? false : true
})

// 4. Toggle playing state
export const togglePlaying = (state) => ({ 
  type: TOGGLE_PLAYING, 
  payload: state.playing ? false : true 
});


//---------------- Reducer -------------------
const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_PLAYLIST:
      return {
        ...state,
        songs: action.payload
      }
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      }
    case TOGGLE_RANDOM:
      return {
        ...state,
        random: action.payload
      }
    case TOGGLE_REPEAT:
      return {
        ...state,
        repeat: action.payload
      }
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: action.payload
      }
    default:
      return state
  }
}

export default playerReducer;