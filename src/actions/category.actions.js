import axios from "../helpers/axios";
import { categoryTypes } from "./types";

const getAllCategory = () => (dispatch) => {
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
  //var token = window.localStorage.getItem("token");
  dispatch({ type: categoryTypes.ADD_CATEGORY_REQUEST });
  axios
    .post(
      "/category/create",
      form
      // , {
      //   headers: {
      //     Authorization: token ? `Bearer ${token}` : "",
      //   },
      // }
    )
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

export const updateCategories = (form) => async (dispatch) => {
  //var token = window.localStorage.getItem("token");
  dispatch({ type: categoryTypes.UPDATE_CATEGORIES_REQUEST });
  const res = await axios.post(
    "/category/update",
    form
    // , {
    //   headers: {
    //     Authorization: token ? `Bearer ${token}` : "",
    //   },
    // }
  );
  if (res.status === 200) {
    dispatch({
      type: categoryTypes.UPDATE_CATEGORIES_SUCCESS,
    });
    dispatch(getAllCategory());
  } else {
    const { error } = res.data;
    dispatch({
      type: categoryTypes.UPDATE_CATEGORIES_FAILURE,
      payload: { error },
    });
  }
};

export const deleteCategories = (ids) => async (dispatch) => {
  dispatch({ type: categoryTypes.DELETE_CATEGORIES_REQUEST });
  //var token = window.localStorage.getItem("token");
  const res = await axios.delete("/category/delete", {
    // headers: {
    //   Authorization: token ? `Bearer ${token}` : "",
    // }
    // ,
    data: {
      payload: {
        ids: ids,
      },
    },
  });
  if (res.status === 200) {
    dispatch({ type: categoryTypes.DELETE_CATEGORIES_SUCCESS });
    dispatch(getAllCategory());
  } else {
    const { error } = res.data;
    dispatch({
      type: categoryTypes.DELETE_CATEGORIES_FAILURE,
      payload: { error },
    });
  }
};

export { getAllCategory };
