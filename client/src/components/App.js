import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// eslint-disable-next-line
import css from "../css/style.css";

import Navbar from "./navbar/Navbar";
import SlideMenu from "./SlideMenu";
import StoreGrid from "./StoreGrid";
import Overlay from "./Overlay";
import Product from "./Product";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import Login from "./navbar/Login";
import SignUp from "./navbar/SignUp";

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Overlay />
        <Navbar />
        <SlideMenu />
        <div className='container'>
          <Route exact path={"/"} component={StoreGrid} />
          <Route exact path={"/products/:id"} component={Product} />
          <Route exact path={"/cart"} component={ShoppingCart} />
          <Route exact path={"/account/login"} component={Login} />
          <Route exact path={"/account/sign-up"} component={SignUp} />
        </div>
      </div>
    </Router>
  );
};

export default App;
