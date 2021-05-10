import React, { createRef, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  removeProductFromCart,
  updateQuantity,
  loadUserCart,
} from "../../actions";

// eslint-disable-next-line
import css from "../../css/shoppingCartCard.css";

const ShoppingCartCard = ({
  cart,
  removeProductFromCart,
  loadUserCart,
  updateQuantity,
  isAuthenticated,
}) => {
  const [itemDelete, setItemDelete] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserCart();
    }
    //eslint-disable-next-line
  }, [itemDelete]);

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

  // this creates an array of all the refs and stores them to an array for each item in cart
  const refs = Array.from(cart, () => createRef(null));

  // this handler loops through the refs and checks that they match the delete button's data-key then removes the item from the dom and cart
  const deleteFromCart = (e) => {
    refs.forEach((ref) => {
      if (
        ref.current.getAttribute("value") ===
        e.target.getAttribute("data-delete")
      ) {
        removeProductFromCart(
          ref.current.getAttribute("value"),
          ref.current.getAttribute("id")
        );
        setItemDelete(!itemDelete);
      }
    });
  };

  const renderOptions = (cartItemQuantity) => {
    const options = [];

    for (let i = 1; i <= 20; i++) {
      options.push(
        <option value={i} key={[i]}>
          Qty: {i}
        </option>
      );
    }
    return options;
  };

  const onChange = (e) => {
    refs.forEach((ref) => {
      if (
        ref.current.getAttribute("value") ===
        e.target.getAttribute("data-select")
      ) {
        updateQuantity({
          _id: ref.current.getAttribute("id"),
          id: +ref.current.getAttribute("value"),
          quantity: +e.target.value,
        });
        console.log(ref.current.getAttribute("id"));
      }
    });
  };

  const renderItems = () => {
    return cart.map((cartItem, i) => {
      return (
        <div
          id={cartItem._id}
          ref={refs[i]}
          key={cartItem.id}
          value={cartItem.id}
          className='cart-card'>
          <img className='cart-card__img' src={cartItem.image} alt='' />
          <div className='cart-card__body'>
            <h5 className='cart-card__title'>{cartItem.title}</h5>
            <h1>${cartItem.price}</h1>
            <div className='cart-card__button-group'>
              <form>
                <select
                  onChange={(e) => onChange(e)}
                  defaultValue={cartItem.quantity}
                  data-select={cartItem.id}
                  name='Quantity'>
                  {renderOptions(cartItem.quantity)}
                </select>
              </form>
              <span
                onClick={deleteFromCart}
                data-delete={cartItem.id}
                className='cart-card__button-group-btn ml-1'>
                Delete Item
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  const emptyCart = () => {
    return <div className='flex-center'>Your shopping cart is empty</div>;
  };

  return (
    <Fragment>
      {grandTotal === 0 ? (
        <Fragment>{emptyCart()}</Fragment>
      ) : (
        <div className='shopping-cart-card-container mb-1'>
          <h1 className='shopping-cart-title'>Shopping Cart</h1>
          {renderItems()}
          <h1 className='subtotal ml-a'>Subtotal: ${grandTotal}</h1>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartItems.cart,
    isAuthenticated: state.authUser.isAuthenticated,
  };
};

export default connect(mapStateToProps, {
  removeProductFromCart,
  updateQuantity,
  loadUserCart,
})(ShoppingCartCard);
