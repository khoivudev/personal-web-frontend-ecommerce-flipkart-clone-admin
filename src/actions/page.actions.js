import { pageTypes } from "./types";
import axios from "../helpers/axios";

export const createPage = (form) => (dispatch) => {
  dispatch({ type: pageTypes.CREATE_PAGE_REQUEST });
  axios
    .post("page/create", form)
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: pageTypes.CREATE_PAGE_SUCCESS,
          payload: { page: res.data.page },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: pageTypes.CREATE_PAGE_FAILURE,
        payload: { error },
      });
    });
};
