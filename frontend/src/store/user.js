//---------------- State -------------------
const initialState = {
  userUrl: "",
  popularArtists: []
};

//---------------- Action Types -------------------
const SET_USER_URL = "user/SET_USER_URL";
const SET_POPULAR_ARTISTS = "user/SET_POPULAR_ARTISTS";

//---------------- POJO actions -------------------
// 1. Set user url
export const setUserUrl = (user) => ({
  type: SET_USER_URL,
  payload: user.username.toLowerCase(),
});

// 2. Set popular artists
export const setPopularArtists = (users) => ({
  type: SET_POPULAR_ARTISTS,
  payload: users
})

//---------------- Thunk actions -------------------
// 1. Get all tracks
export const getPopularArtists = () => async dispatch => {
  const res = await fetch("/api/users/list/popular");
  console.log(res);
  // dispatch(setTracks(res.data.tracks));
  // return res.data.tracks;
}

//---------------- Reducer -------------------
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_URL:
      return {
        ...state,
        userUrl: action.payload
      };
    case SET_POPULAR_ARTISTS:
      return {
        ...state,
        popularArtists: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;