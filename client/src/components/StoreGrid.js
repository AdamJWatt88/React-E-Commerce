import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions";
import { Link } from "react-router-dom";
import Loading from "./Loading";
// eslint-disable-next-line
import css from "../css/storeGrid.css";

const StoreGrid = ({ getProducts, products, category }) => {
  // anytime categories state has been loaded by a user making selections from the checkbox, the getCategory fetch call will be made.
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const sortedProducts = () => {
    return category.map((item) => {
      return (
        <div className='card' key={item.id}>
          <Link
            className='card__link'
            key={item.id}
            to={`/products/${item.id}`}>
            <img className='card__img' src={item.image} alt={item.image} />
            <div className='card__content'>
              <p className='card__title'>{item.title}</p>
              <h1>${item.price}</h1>
            </div>
          </Link>
        </div>
      );
    });
  };

  const renderImages = () => {
    return products.map((item) => {
      return (
        <div className='card' key={item.id}>
          <Link
            className='card__link'
            key={item.id}
            to={`/products/${item.id}`}>
            <img className='card__img' src={item.image} alt={item.image} />
            <div className='card__content'>
              <p className='card__title'>{item.title}</p>
              <h1>${item.price}</h1>
            </div>
          </Link>
        </div>
      );
    });
  };

  if (!products) {
    return <Loading />;
  }

  return (
    <div className='container-grid mq-col-1 mq-col-2 col-4'>
      {category ? sortedProducts() : renderImages()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    category: state.category,
  };
};

export default connect(mapStateToProps, {
  getProducts,
})(StoreGrid);
