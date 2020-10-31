import { productTypes } from "../actions/types";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case productTypes.GET_ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productTypes.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };
    case productTypes.GET_ALL_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case productTypes.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload.product],
        loading: false,
      };
    case productTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
