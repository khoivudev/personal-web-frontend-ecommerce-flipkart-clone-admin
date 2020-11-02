import { authTypes } from "./types";
import axios from "../helpers/axios";

export const login = (user) => (dispatch) => {
  dispatch({ type: authTypes.LOGIN_REQUEST });
  axios
    .post("/auth/admin/signin", user)
    .then((res) => {
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authTypes.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: authTypes.LOGIN_FAILURE,
        payload: {
          error: error.response.data.error,
        },
      });
    });
};

export const isUserLoggedIn = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: authTypes.LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  } else {
    dispatch({
      type: authTypes.LOGIN_FAILURE,
      payload: {
        error: "Please login to continue",
      },
    });
  }
};

export const signout = () => (dispatch) => {
  dispatch({ type: authTypes.LOGOUT_REQUEST });
  //var token = window.localStorage.getItem("token");
  axios
    .post(
      "/auth/admin/signout"
      // ,
      // {},
      // {
      //   headers: {
      //     Authorization: token ? `Bearer ${token}` : "",
      //   },
      // }
    )
    .then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        dispatch({
          type: authTypes.LOGOUT_SUCCESS,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: authTypes.LOGOUT_FAILURE,
        payload: {
          error: error.response.data.error,
        },
      });
    });
};
