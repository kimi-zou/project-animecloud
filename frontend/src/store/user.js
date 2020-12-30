import { fetch } from "./csrf";

//---------------- State -------------------
const initialState = {
  currentViewUserUrl: "",
  popularArtists: null,
  currentViewUser: "",
};

//---------------- Action Types -------------------
const SET_USER_URL = "user/SET_USER_URL";
const SET_POPULAR_ARTISTS = "user/SET_POPULAR_ARTISTS";
const SET_CURRENT_VIEW_USER = "user/SET_CURRENT_VIEW_USER";

//---------------- POJO actions -------------------
// 1. Set user url
export const setCurrentViewUserUrl = (user) => ({
  type: SET_USER_URL,
  payload: user.username.toLowerCase(),
});

// 2. Set popular artists
export const setPopularArtists = (users) => ({
  type: SET_POPULAR_ARTISTS,
  payload: users
})

// 3. Set current viewing user (displayed in profile page)
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

//---------------- Reducer -------------------
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_URL:
      return {
        ...state,
        currentViewUserUrl: action.payload
      };
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