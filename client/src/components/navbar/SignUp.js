import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearErrors, registerUser, setAlert } from "../../actions";
import Alert from "../alert/Alert";

// eslint-disable-next-line
import css from "../../css/signUp.css";

const SignUp = ({
  registerUser,
  authUser,
  alerts,
  setAlert,
  history,
  clearErrors,
}) => {
  const [isMatch, setIsMatch] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;
  const { isAuthenticated, error } = authUser;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    } else if (error === "Please include email") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setIsMatch(true);
      setTimeout(() => setIsMatch(false), 3000);
    } else {
      registerUser(user);
    }
  };

  return (
    <div className='flex-center flex-dc'>
      <Alert />
      <div className='sign-up__card'>
        <p className='sign-up__font--white'>Create an account</p>
        <form className='sign-up__form flex-center flex-dc' onSubmit={onSubmit}>
          <label className='sign-up__label' htmlFor='name'>
            Username
          </label>
          <input
            className='sign-up__input'
            type='text'
            name='name'
            value={name}
            placeholder='Enter a username'
            onChange={onChange}
            required
          />
          <label className='sign-up__label' htmlFor='email'>
            Email
          </label>
          <input
            className='sign-up__input'
            type='email'
            name='email'
            value={email}
            placeholder='Enter an email'
            onChange={onChange}
            required
          />
          <label className='sign-up__label' htmlFor='password'>
            Password
          </label>
          <input
            className='sign-up__input'
            type='password'
            name='password'
            value={password}
            placeholder='Enter a password'
            onChange={onChange}
            required
            minLength='6'
          />
          <label className='sign-up__label' htmlFor='password2'>
            Confirm Password
          </label>
          <input
            className='sign-up__input'
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={onChange}
            required
            minLength='6'
          />
          <div className='sign-up__button-group'>
            <p
              className={
                !isMatch ? "sign-up__password" : "sign-up__password-match"
              }>
              Passwords must match
            </p>
            <button type='submit' className='btn btn--secondary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps, {
  registerUser,
  setAlert,
  clearErrors,
})(SignUp);
