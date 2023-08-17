import React, { useState } from "react";
import styles from "./product.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
const Product = ({product}) => {

  return (
    <>
      <div>
        <div className={styles.product_container}>
          <div className={styles.image_container}>
            <img
              className={styles.product_image}
              src={product.image?.url}
              alt=""
            />
          </div>
          <div className={styles.product_NameAndPrice}>
            <span className={styles.product_name}>{product.name}</span>
            <span className={styles.product_price}>
              {product.price?.raw}
              <span>$</span>
            </span>
          </div>
          <div className={styles.details_and_shoppingLogo_container}>
            <Link to={`/ProductDetails/${product.id}`}>
              <button className={styles.viewDetails}>View Details</button>
            </Link>
            <FaShoppingCart className={styles.shoppingLogo}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
