import { FETCH_CATEGORY, CLEAR_CATEGORY } from "../types";

const categoryReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return action.payload;
    case CLEAR_CATEGORY:
      return (state = null);
    default:
      return state;
  }
};

export default categoryReducer;
