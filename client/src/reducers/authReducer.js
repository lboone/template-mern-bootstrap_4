import { SET_CURRENT_USER } from "../actions/types";
import isNotEmpty from "../utils/isNotEmpty";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: isNotEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
