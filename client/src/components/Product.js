import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSingleProduct, addProductToCart, isItemInCart } from "../actions";
import Loading from "./Loading";

// eslint-disable-next-line
import css from "../css/product.css";

const Product = (props) => {
  const { singleProduct, cart } = props;
  const { id } = props.match.params;

  const [number, setNumber] = useState(1);

  useEffect(() => {
    props.getSingleProduct(id);
    // eslint-disable-next-line
  }, []);

  if (!singleProduct) {
    return <Loading />;
  }

  const addToCart = (e) => {
    e.preventDefault();

    const checkCart = (element) => element.id === singleProduct.id;

    cart.some(checkCart)
      ? props.isItemInCart()
      : props.addProductToCart({ ...singleProduct, quantity: number });
  };

  const onChange = (e) => {
    setNumber(+e.target.value);
  };

  const increaseValue = () => {
    setNumber(number + 1);
  };

  const decreaseValue = () => {
    if (number === 0) {
      setNumber(0);
    } else {
      setNumber(number - 1);
    }
  };

  const renderProduct = () => {
    const { image, title, price, description } = singleProduct;

    return (
      <Fragment>
        <div className='product-card'>
          <img className='product-card__img' src={image} alt={image} />
          <div className='product-card__body mb-1'>
            <h5>{title}</h5>
            <p>{description}</p>
          </div>
          <div className='product-card__btn-group'>
            <p>
              Price <strong>${price}</strong>
            </p>
            <form onSubmit={addToCart}>
              <div className='quantity-selector mr-1 mb-1'>
                <span
                  onClick={() => increaseValue()}
                  className='quantity-selector__increment
              quantity-selector__increment-increase no-select'>
                  +
                </span>
                <input
                  name='product'
                  min='1'
                  type='number'
                  className='quantity-selector__input'
                  onChange={onChange}
                  value={number}
                />
                <span
                  onClick={() => decreaseValue()}
                  className='quantity-selector__increment quantity-selector__increment-decrease no-select'>
                  -
                </span>
              </div>

              <button className='btn btn--secondary mr-1 mb-1'>
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  };

  return <div className='product-container'>{renderProduct()}</div>;
};

const mapStateToProps = (state) => {
  return {
    singleProduct: state.singleProduct,
    cart: state.cartItems.cart,
  };
};

export default connect(mapStateToProps, {
  getSingleProduct,
  addProductToCart,
  isItemInCart,
})(Product);
