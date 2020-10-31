import { initialDataTypes, productTypes, categoryTypes } from "./types";
import axios from "../helpers/axios";

export const getInitialData = () => (dispatch) => {
  axios
    .get("/initialdata")
    .then((res) => {
      if (res.status === 200) {
        const { categories, products } = res.data;
        dispatch({
          type: categoryTypes.GET_ALL_CATEGORY_SUCCESS,
          payload: {
            categories: categories,
          },
        });

        dispatch({
          type: productTypes.GET_ALL_PRODUCT_SUCCESS,
          payload: {
            products: products,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
