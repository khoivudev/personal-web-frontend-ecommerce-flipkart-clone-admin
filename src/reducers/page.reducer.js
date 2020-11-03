import { pageTypes } from "../actions/types";

const inititalState = {
  error: null,
  loading: false,
  page: {},
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
        page: action.payload.page,
        loading: false,
      };
    case pageTypes.CREATE_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
