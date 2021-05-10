import React, { Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  showSlideMenu,
  logout,
  loadUser,
  loadUserCart,
  getCategory,
  clearCategory,
} from "../../actions";

// eslint-disable-next-line
import css from "../../css/navbar.css";

const Navbar = ({
  loadUser,
  logout,
  showSlideMenu,
  authUser,
  getCategory,
  clearCategory,
}) => {
  const { isAuthenticated, user } = authUser;

  const ref = useRef();
  const ref2 = useRef();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const onLogout = () => {
    logout();
  };

  const open = () => {
    document.body.classList.toggle("open");
  };

  const onMouseOver = () => {
    ref.current.classList.add("play");
    ref2.current.classList.add("show");
  };

  const onMouseOut = () => {
    ref.current.classList.remove("play");
    ref.current.classList.add("paused");
    ref2.current.classList.remove("show");
    setTimeout(() => {
      ref.current.classList.remove("paused");
    }, 300);
  };

  const onClick = (e) => {
    getCategory(e.target.getAttribute("value"));
  };

  const guestLinks = () => {
    return (
      <Fragment>
        <Link to='/account/login'>
          <button className='btn btn--primary'>Login</button>
        </Link>
        <Link to='/account/sign-up'>
          <button className='btn btn--secondary'>Sign Up</button>
        </Link>
      </Fragment>
    );
  };

  const authLinks = () => {
    return (
      <div className='navbar__user-login'>
        <h1>Hello {user && user.name}</h1>
        <a onClick={onLogout} href='#!'>
          <img src='/images/logout2.svg' alt='' />
          <span>Logout</span>
        </a>
      </div>
    );
  };

  const renderedItems = () => {
    return (
      <Fragment>
        <div className='navbar__title-group'>
          <button
            onClick={() => {
              showSlideMenu();
              open();
            }}
            className='btn hamburger navbar__icon--bg-color'>
            <i className='lni lni-menu navbar__icon'></i>
          </button>

          <h1 className='navbar__title'>Store Name</h1>

          <div
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className='navbar__categories ml-1'>
            Categories
            <i ref={ref} className='lni lni-chevron-down ml-1'></i>
            <div ref={ref2} className='navbar__dropdown'>
              <ul className='navbar__list'>
                <Link className='navbar__list-item mb-1' to='/'>
                  <li onClick={clearCategory}>All</li>
                </Link>
                <Link className='navbar__list-item mb-1' to='/'>
                  <li onClick={onClick} value="men's clothing">
                    Mens Clothing
                  </li>
                </Link>
                <Link className='navbar__list-item mb-1' to='/'>
                  <li onClick={onClick} value="women's clothing">
                    Womens Clothing
                  </li>
                </Link>
                <Link className='navbar__list-item mb-1' to='/'>
                  <li onClick={onClick} value='jewelery'>
                    Jewelry
                  </li>
                </Link>
                <Link className='navbar__list-item mb-1' to='/'>
                  <li onClick={onClick} value='electronics'>
                    Electronics
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <div className='navbar__btn-group'>
          <Link to='/'>
            <button className='btn navbar__icon--bg-color'>
              <i className='lni lni-home navbar__icon'></i>
            </button>
          </Link>
          <Link to='/cart'>
            <button className='btn navbar__icon--bg-color'>
              <i className='lni lni-cart navbar__icon'></i>
            </button>
          </Link>
          {isAuthenticated ? authLinks() : guestLinks()}
        </div>
      </Fragment>
    );
  };

  return <div className='navbar bg-dark'>{renderedItems()}</div>;
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
    openOrClosed: state.openOrClosed,
  };
};

export default connect(mapStateToProps, {
  showSlideMenu,
  logout,
  loadUser,
  loadUserCart,
  getCategory,
  clearCategory,
})(Navbar);
