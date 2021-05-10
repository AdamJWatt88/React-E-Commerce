import { SET_SLIDE_MENU } from "../types";

const setSlideMenuReducer = (state = false, action) => {
  switch (action.type) {
    case SET_SLIDE_MENU:
      return !state;
    default:
      return state;
  }
};

export default setSlideMenuReducer;
