import { userTypes } from "./types";
import axios from "../helpers/axios";

export const signup = (user) => (dispatch) => {
  dispatch({ type: userTypes.USER_REGISTER_REQUEST });

  axios
    .post("/auth/admin/signup", user)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: userTypes.USER_REGISTER_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: userTypes.USER_REGISTER_FAILURE,
        payload: {
          error: error.response.data.error,
        },
      });
    });
};
