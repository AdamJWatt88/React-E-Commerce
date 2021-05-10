import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, getCategory, clearCategory } from "../actions";

// eslint-disable-next-line
import css from "../css/slideMenu.css";

const SlideMenu = ({
  openOrClosed,
  authUser,
  logout,
  getCategory,
  clearCategory,
}) => {
  const { isAuthenticated, user } = authUser;

  const onLogout = () => {
    logout();
  };

  const onClick = (e) => {
    getCategory(e.target.getAttribute("value"));
  };

  const guestLinks = () => {
    return (
      <div className='slide-menu__user-login'>
        <Link className='slide-menu__item' to='/account/login'>
          <img src='/images/login.svg' alt='' />
          <span>Login</span>
        </Link>
        <Link className='slide-menu__item' to='/account/sign-up'>
          <img src='/images/sign-up.svg' alt='' />
          <span>Sign Up</span>
        </Link>
      </div>
    );
  };

  const authLinks = () => {
    return (
      <div className='slide-menu__user-login'>
        <span className='slide-menu__user'>
          <i className='lni lni-user slide-menu__icon'></i>
          <h1>Hello {user && user.name}</h1>
        </span>
        <a
          className='slide-menu__logout slide-menu__item'
          onClick={onLogout}
          href='#!'>
          <img src='/images/logout.svg' alt='' />
          <span>Logout</span>
        </a>
      </div>
    );
  };

  const renderLinks = () => {
    return <Fragment>{isAuthenticated ? authLinks() : guestLinks()}</Fragment>;
  };

  const renderItems = () => {
    return (
      <div className='container-flex flex-dc'>
        <Link className='slide-menu__item' to='/'>
          <span>
            <i className='lni lni-home slide-menu__icon'></i>Home
          </span>
        </Link>
        <Link className='slide-menu__item' to='/cart'>
          <span>
            <i className='lni lni-cart slide-menu__icon'></i>Cart
          </span>
        </Link>
        <h1 className='slide-menu__categories'>Categories</h1>
        <Link className='slide-menu__item' to='/'>
          <span onClick={clearCategory}>All</span>
        </Link>
        <Link className='slide-menu__item' to='/'>
          <span onClick={onClick} value="men's clothing">
            Mens Clothing
          </span>
        </Link>
        <Link className='slide-menu__item' to='/'>
          <span onClick={onClick} value="women's clothing">
            Womens Clothing
          </span>
        </Link>
        <Link className='slide-menu__item' to='/'>
          <span onClick={onClick} value='jewelery'>
            Jewelry
          </span>
        </Link>
        <Link className='slide-menu__item' to='/'>
          <span onClick={onClick} value='electronics'>
            Electronics
          </span>
        </Link>
      </div>
    );
  };

  const toggleMenu = () => {
    if (!openOrClosed) {
      return "slide-menu";
    } else {
      return "slide-menu open";
    }
  };

  const toggle = toggleMenu();

  return (
    <div className={`${toggle}`}>
      {renderLinks()}
      {renderItems()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openOrClosed: state.openOrClosed,
    authUser: state.authUser,
  };
};

export default connect(mapStateToProps, {
  logout,
  getCategory,
  clearCategory,
})(SlideMenu);
