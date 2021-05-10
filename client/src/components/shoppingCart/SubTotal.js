import React, { Fragment } from "react";
import { connect } from "react-redux";

// eslint-disable-next-line
import css from "../../css/subTotal.css";

const SubTotal = ({ cart }) => {
  const priceOfItems = [null];

  cart.forEach((item) => {
    const totalEach = item.price * item.quantity;
    priceOfItems.push(totalEach);
  });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const totalOfCart = priceOfItems.reduce(reducer);

  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === "undefined" || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
  }

  // Decimal round
  const round10 = (value, exp) => decimalAdjust("round", value, exp);

  const grandTotal = round10(totalOfCart, -2);

  const renderItems = () => {
    return (
      <div className='cost-total ml-1'>
        <p>
          Subtotal: <strong>${grandTotal}</strong>
        </p>
        <button className='btn btn--checkout'>Checkout</button>
      </div>
    );
  };

  return <Fragment>{grandTotal === 0 ? "" : renderItems()}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartItems.cart,
  };
};

export default connect(mapStateToProps)(SubTotal);
