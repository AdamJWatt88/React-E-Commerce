import { FETCH_PRODUCTS } from "../types";

const productsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default productsReducer;
