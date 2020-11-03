import { pageTypes } from "../actions/types";

const inititalState = {
  loading: false,
};

export default function (state = inititalState, action) {
  switch (action.type) {
    case pageTypes.CREATE_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case pageTypes.CREATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case pageTypes.CREATE_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
