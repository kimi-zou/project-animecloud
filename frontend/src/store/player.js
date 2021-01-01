//---------------- State -------------------
const initialState = { 
  audioNode: null,
  audioTime: 0,
  audioSrc: "",
  currentSong: {id: -1},
  playlist: [],
  repeat: false,
  random: false,
  playing: false,
};

// Action Types:
const SET_AUDIO_SRC = "player/SET_AUDIO_SRC"
const SET_CURRENT_SONG = "player/SET_CURRENT_SONG";
const TOGGLE_RANDOM = "player/TOGGLE_RANDOM";
const TOGGLE_REPEAT = "player/TOGGLE_OPTIONS";
const TOGGLE_PLAYING = "player/TOGGLE_PLAYING";
const SAVE_AUDIO_NODE = "player/SAVE_AUDIO";
const SAVE_AUDIO_TIME = "player/SAVE_AUDIO_TIME";

// POJO actions:
// 0. Set audio source
export const setAudioSrc = (path) => ({
  type: SET_AUDIO_SRC,
  payload: path
})

// 1. Set current song
export const setCurrentSong = (song) => ({
  type: SET_CURRENT_SONG,
  payload: song
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

// 5. Save Audio Node
export const saveAudioNode = (audioNode) => ({
  type: SAVE_AUDIO_NODE,
  payload: audioNode
})

// 6. Save Audio Time
export const saveAudioTime = (time) => ({
  type: SAVE_AUDIO_TIME,
  payload: time
})

//---------------- Reducer -------------------
const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO_SRC:
      return {
        ...state,
        audioSrc: action.payload
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
    case SAVE_AUDIO_NODE:
      return {
        ...state,
        audioNode: action.payload
      }
    case SAVE_AUDIO_TIME:
      return {
        ...state,
        audioTime: action.payload
      }
    default:
      return state
  }
}

export default playerReducer;