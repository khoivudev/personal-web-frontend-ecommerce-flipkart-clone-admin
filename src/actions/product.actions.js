import { productTypes } from "./types";
import axios from "../helpers/axios";

export const getAllProduct = () => (dispatch) => {
  dispatch({ type: productTypes.GET_ALL_PRODUCT_REQUEST });
  axios
    .get("/product/getproduct")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: productTypes.GET_ALL_PRODUCT_SUCCESS,
          payload: {
            products: res.data.products,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: productTypes.GET_ALL_PRODUCT_FAILURE,
        payload: {
          error: error,
        },
      });
    });
};

export const addProduct = (form) => (dispatch) => {
  var token = window.localStorage.getItem("token");
  dispatch({ type: productTypes.ADD_PRODUCT_REQUEST });
  axios
    .post("/product/create", form, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
    .then((res) => {
      dispatch({
        type: productTypes.ADD_PRODUCT_SUCCESS,
        payload: {
          product: res.data.product,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: productTypes.ADD_PRODUCT_FAILURE,
        payload: {
          error: error,
        },
      });
    });
};
