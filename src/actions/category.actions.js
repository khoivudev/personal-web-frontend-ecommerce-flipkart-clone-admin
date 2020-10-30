import axios from "../helpers/axios";
import { categoryTypes } from "./types";

export const getAllCategory = () => (dispatch) => {
  dispatch({ type: categoryTypes.GET_ALL_CATEGORY_REQUEST });
  axios
    .get("/category/getcategory")
    .then((res) => {
      if (res.status === 200) {
        const { categoryList } = res.data;
        dispatch({
          type: categoryTypes.GET_ALL_CATEGORY_SUCCESS,
          payload: {
            categories: categoryList,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: categoryTypes.GET_ALL_CATEGORY_FAILURE,
        payload: {
          error: error,
        },
      });
    });
};

export const addCategory = (form) => (dispatch) => {
  var token = window.localStorage.getItem("token");
  dispatch({ type: categoryTypes.ADD_CATEGORY_REQUEST });
  axios
    .post("/category/create", form, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: categoryTypes.ADD_CATEGORY_SUCCESS,
          payload: {
            category: res.data.category,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: categoryTypes.ADD_CATEGORY_FAILURE,
        payload: {
          error: error,
        },
      });
    });
};
