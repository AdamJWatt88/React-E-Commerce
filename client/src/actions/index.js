import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { v4 as uuidv4 } from "uuid";

import {
  FETCH_SINGLE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_CATEGORY,
  SET_SLIDE_MENU,
  CLEAR_CATEGORY,
  CLEAR_PRODUCT,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CART_ITEM_CHECK,
  CART_ERROR,
  UPDATE_QUANTITY,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EMAIL_FAIL,
  USER_LOADED,
  LOAD_USER_CART,
  AUTH_ERROR,
  REMOVE_ALERT,
  SET_ALERT,
  CLEAR_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

//open and close the slideMenu if true or false
export const showSlideMenu = () => {
  return {
    type: SET_SLIDE_MENU,
  };
};

//get all products
export const getProducts = (categories) => {
  return async (dispatch) => {
    const response = await fetch("https://fakestoreapi.com/products");

    const data = await response.json();

    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
    dispatch({
      type: CLEAR_PRODUCT,
    });
  };
};

// fetch products by category
export const getCategory = (category) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const data = await response.json();

    dispatch({
      type: FETCH_CATEGORY,
      payload: data,
    });
  };
};

export const clearCategory = () => {
  return {
    type: CLEAR_CATEGORY,
  };
};

// fetch a single product by its id
export const getSingleProduct = (id) => {
  return async (dispatch) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();

    dispatch({
      type: FETCH_SINGLE_PRODUCT,
      payload: data,
    });
  };
};

//adds a product to the cartItems state
export const addProductToCart = (cartItem) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const isAuthenticated = getState().authUser.isAuthenticated;

    try {
      if (isAuthenticated) {
        const res = await axios.post("/api/cart", cartItem, config);

        dispatch({
          type: ADD_CART_ITEM,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_CART_ITEM,
          payload: cartItem,
        });
      }
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response.msg,
      });
    }
  };
};

//remove a product from the cartItems state
export const removeProductFromCart = (cartItem, id) => {
  return async (dispatch, getState) => {
    const isAuthenticated = getState().authUser.isAuthenticated;

    try {
      if (isAuthenticated) {
        const res = await axios.delete(`/api/cart/${id}`);
        dispatch({
          type: REMOVE_CART_ITEM,
          payload: +cartItem,
        });
      } else {
        dispatch({
          type: REMOVE_CART_ITEM,
          payload: +cartItem,
        });
      }
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.message,
      });
    }
  };
};

export const updateQuantity = ({ _id, id, quantity }) => {
  return async (dispatch, getState) => {
    const isAuthenticated = getState().authUser.isAuthenticated;

    try {
      if (isAuthenticated) {
        const res = await axios.put(`/api/cart/${_id}`, { quantity });
        dispatch({
          type: UPDATE_QUANTITY,
          payload: res.data,
        });
      } else {
        dispatch({
          type: UPDATE_QUANTITY,
          payload: { id, quantity },
        });
      }
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.message,
      });
    }
  };
};

//checks if an item is already inside the cartItems state by matching the id
export const isItemInCart = () => {
  alert("That item is already in cart");
  return {
    type: CART_ITEM_CHECK,
  };
};

export const loadUserCart = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/cart");

    dispatch({
      type: LOAD_USER_CART,
      payload: res.data,
    });
  };
};

// Load user
export const loadUser = () => {
  return async (dispatch) => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response });
    }
  };
};

// Register user
export const registerUser = (user) => {
  return async (dispatch) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", user, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      console.log(err.response);
      if (err.response.data.msg === "User already exists") {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data.msg,
        });
      } else {
        dispatch({
          type: EMAIL_FAIL,
          payload: err.response.data.errors[0].msg,
        });
      }
    }
  };
};

// Login user
export const login = (user) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", user, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

// Set alert
export const setAlert = (msg, type, timeout = 5000) => {
  const id = uuidv4();
  return async (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
