import { combineReducers } from "redux";
import auth from "./authReducer";
import profile from "./profileReducer";
import errors from "./errorReducer";

export default combineReducers({
  auth,
  profile,
  errors
});
