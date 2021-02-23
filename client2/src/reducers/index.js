import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import streamReducer from "./formReducer";

const INITIAL_STATE = {
  isLoggedIn: false,
  googleId: null,
};

const LogIn = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isLoggedIn: true, googleId: action.payload };
    case "LOG_OUT":
      return { ...state, isLoggedIn: false, googleId: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  loginInformation: LogIn,
  form: formReducer,
  streams: streamReducer,
});
