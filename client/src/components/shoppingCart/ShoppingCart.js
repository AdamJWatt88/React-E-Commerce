import React from "react";
import ShoppingCartCard from "./ShoppingCartCard";
import SubTotal from "./SubTotal";

// eslint-disable-next-line
import css from "../../css/shoppingCart.css";

const ShoppingCart = () => {
  return (
    <div className='shopping-cart'>
      <ShoppingCartCard />
      <SubTotal />
    </div>
  );
};

export default ShoppingCart;
