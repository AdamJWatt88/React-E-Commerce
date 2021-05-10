import { FETCH_SINGLE_PRODUCT, CLEAR_PRODUCT } from "../types";

const singleProductReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.payload;
    case CLEAR_PRODUCT:
      return (state = null);
    default:
      return state;
  }
};

export default singleProductReducer;
