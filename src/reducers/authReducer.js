import { authTypes } from "../actions/types";

const inititalState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  error: "",
};

export default function (state = inititalState, action) {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
    case authTypes.LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        error: action.payload.error,
      };
    case authTypes.LOGOUT_REQUEST:
      return inititalState;

    default:
      return state;
  }
}
