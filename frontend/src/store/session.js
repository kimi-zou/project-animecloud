// Internal dependencies
import { fetch } from "./csrf";

// Action Types:
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

//---------------- POJO Actions -------------------
// 1. Set user
const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

// 2. Remove user
const removeUser = () => ({
  type: REMOVE_USER,
});

//---------------- Thunk Actions -------------------
// 1. Login
export const login = (user) => async dispatch => {
  const { credential, password } = user;
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  dispatch(setUser(response.data.user));
  return response;
};

// 2. Restore User
export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

// 3. Signup
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  dispatch(setUser(response.data.user));
  return response;
};

//---------------- State -------------------
const initialState = { user: null };

//---------------- Reducer -------------------
const sessionReducer = ( state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;