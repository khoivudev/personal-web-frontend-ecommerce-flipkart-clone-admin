import { userTypes } from "../actions/types";

const inititalState = {
  error: "",
  message: "",
  loading: false,
};

export default function (state = inititalState, action) {
  switch (action.type) {
    case userTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case userTypes.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
