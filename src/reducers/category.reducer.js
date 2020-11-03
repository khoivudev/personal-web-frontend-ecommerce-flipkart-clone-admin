import { categoryTypes } from "../actions/types";

const inititalState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: [],
      };
      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, [...cat.children], category)
          : [],
      });
    }
  }
  return myCategories;
};

export default function (state = inititalState, action) {
  switch (action.type) {
    case categoryTypes.GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryTypes.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    case categoryTypes.GET_ALL_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case categoryTypes.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryTypes.ADD_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      return {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
    case categoryTypes.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case categoryTypes.UPDATE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryTypes.UPDATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case categoryTypes.UPDATE_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryTypes.DELETE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryTypes.DELETE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case categoryTypes.DELETE_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
