import { fetch } from "./csrf";

//---------------- State -------------------
const initialState = {
  popularArtists: null,
  currentViewUser: "",
};

//---------------- Action Types -------------------
const SET_POPULAR_ARTISTS = "user/SET_POPULAR_ARTISTS";
const SET_CURRENT_VIEW_USER = "user/SET_CURRENT_VIEW_USER";

//---------------- POJO actions -------------------
// 1. Set popular artists
export const setPopularArtists = (users) => ({
  type: SET_POPULAR_ARTISTS,
  payload: users
})

// 2. Set current viewing user (displayed in profile page)
export const setCurrentViewUser = (user) => ({
  type: SET_CURRENT_VIEW_USER,
  payload: user
})

//---------------- Thunk actions -------------------
// 1. Get the list of artists with most tracks
export const getPopularArtists = () => async dispatch => {
  const res = await fetch("/api/users/list/popular");
  dispatch(setPopularArtists(res.data.user));
  return res.data.user;
}

// 2. Get user by username
export const getCurrentViewUser = (username) => async dispatch => {
  const res = await fetch(`/api/users/by/username/${username}`);
  dispatch(setCurrentViewUser(res.data.user[0]));
  return res.data.user[0];
}

//---------------- Reducer -------------------
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POPULAR_ARTISTS:
      return {
        ...state,
        popularArtists: action.payload
      };
    case SET_CURRENT_VIEW_USER:
      return {
        ...state,
        currentViewUser: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;