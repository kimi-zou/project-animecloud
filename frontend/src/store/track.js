import { fetch } from "./csrf";

//---------------- State -------------------
const initialState = { 
  currentUserTracks: null,
  recentReleasedTracks: null,
};

// Action Types:
const SET_CURRENT_USER_TRACKS = "track/SET_CURRENT_USER_TRACKS";
const SET_RECENT_RELEASED_TRACKS = "track/SET_RECENT_RELEASED_TRACKS";

//---------------- POJO Actions -------------------
// 1. Set tracks
const setCurrentUserTracks = (tracks) => ({
  type: SET_CURRENT_USER_TRACKS,
  payload: tracks,
});

// 2. Set recent released tracks
const setRecntReleasedTracks = (tracks) => ({
  type: SET_RECENT_RELEASED_TRACKS,
  payload: tracks
})

//---------------- Thunk Actions -------------------
// 1. Get tracks by user id
export const getTracks = (id) => async dispatch => {
  const res = await fetch(`/api/tracks/${id}`);
  dispatch(setCurrentUserTracks(res.data.user));
  return res.data.user;
}

// 2. Get recent released tracks
export const getRecentReleasedTracks = () => async dispatch => {
  const res = await fetch("/api/tracks/list/newest");
  dispatch(setRecntReleasedTracks(res.data.tracks));
  return res.data.tracks;
}

//---------------- Reducer -------------------
const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_TRACKS:
      return {
        ...state,
        currentUserTracks: action.payload
      };
    case SET_RECENT_RELEASED_TRACKS:
      return {
        ...state,
        recentReleasedTracks: action.payload
      };
    default:
      return state;
  }
}

export default trackReducer;