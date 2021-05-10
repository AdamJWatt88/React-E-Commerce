import _ from "lodash";

import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_QUANTITY,
  CART_ITEM_CHECK,
  CART_ERROR,
  LOAD_USER_CART,
  LOGOUT,
} from "../types";

const initialState = {
  cart: [],
  error: null,
};

const cartItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case LOAD_USER_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case CART_ITEM_CHECK:
      return state;
    case UPDATE_QUANTITY:
      const foundItem = _.find(state.cart, { id: action.payload.id });
      const updatedItem = { ...foundItem, quantity: action.payload.quantity };
      const filteredState = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cart: [...filteredState, updatedItem],
      };
    case CART_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartItemReducer;
