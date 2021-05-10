import { combineReducers } from "redux";

import productsReducer from "./productsReducer";
import setSlideMenuReducer from "./setSlideMenuReducer";
import categoryReducer from "./categoryReducer";
import singleProductReducer from "./singleProductReducer";
import cartItemReducer from "./cartItemReducer";
import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";

export default combineReducers({
  openOrClosed: setSlideMenuReducer,
  products: productsReducer,
  singleProduct: singleProductReducer,
  category: categoryReducer,
  cartItems: cartItemReducer,
  authUser: authReducer,
  alerts: alertsReducer,
});
