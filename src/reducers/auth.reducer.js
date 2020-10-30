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
  loading: false,
  message: "",
};

export default function (state = inititalState, action) {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
        loading: true,
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
    case authTypes.LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        loading: false,
        error: action.payload.error,
      };
    case authTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        ...inititalState,
        loading: false,
      };
    case authTypes.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
