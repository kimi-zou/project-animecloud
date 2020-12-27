import { fetch } from "./csrf";

// Action Types:
const SET_TRACKS = "tracks/setTracks";

//---------------- POJO Actions -------------------
// 1. Set tracks
const setTracks = (tracks) => ({
  type: SET_TRACKS,
  payload: tracks,
});

//---------------- Thunk Actions -------------------
// 1. Get all tracks
export const getTracks = () => async dispatch => {
  const res = await fetch("/api/tracks");
  dispatch(setTracks(res.data.tracks));
  return res;
}

//---------------- State -------------------
const initialState = { tracks: null };

//---------------- Reducer -------------------
const trackReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_TRACKS:
      newState = Object.assign({}, state);
      newState.tracks = action.payload;
      return newState;
    default:
      return state;
  }
}

export default trackReducer;