import { fetch } from "./csrf";

//---------------- State -------------------
const initialState = { currentUserTracks: null };

// Action Types:
const SET_CURRENT_USER_TRACKS = "track/SET_CURRENT_USER_TRACKS";

//---------------- POJO Actions -------------------
// 1. Set tracks
const setCurrentUserTracks = (tracks) => ({
  type: SET_CURRENT_USER_TRACKS,
  payload: tracks,
});

//---------------- Thunk Actions -------------------
// 1. Get all tracks
export const getTracks = (id) => async dispatch => {
  const res = await fetch(`/api/tracks/${id}`);
  dispatch(setCurrentUserTracks(res.data.tracks));
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
    default:
      return state;
  }
}

export default trackReducer;