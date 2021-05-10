import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setAlert,
  login,
  clearErrors,
  loadUserCart,
  addProductToCart,
} from "../../actions";
import Alert from "../alert/Alert";

// eslint-disable-next-line
import css from "../../css/login.css";

const Login = ({
  setAlert,
  login,
  clearErrors,
  authUser,
  loadUserCart,
  history,
  addProductToCart,
  cart,
}) => {
  const { isAuthenticated, error } = authUser;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      cart.forEach((item) => addProductToCart(item));
      loadUserCart();
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='flex-center flex-dc'>
      <Alert />
      <div className='login__background flex-center flex-dc'>
        <form className='login__form' onSubmit={onSubmit}>
          <label htmlFor='email'>Email Address</label>
          <input
            className='login__input'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Enter your email...'
            required
          />
          <label htmlFor='password'>Password</label>
          <input
            className='login__input'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Enter your password...'
            required
          />
          <button type='submit' className='btn btn--secondary'>
            Login
          </button>
        </form>
        <Link to='/account/sign-up' className='login__link--font-color'>
          Not yet a member? Sign up here!
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
    cart: state.cartItems.cart,
  };
};

export default connect(mapStateToProps, {
  setAlert,
  login,
  clearErrors,
  loadUserCart,
  addProductToCart,
})(Login);
