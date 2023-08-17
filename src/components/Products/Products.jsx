import React, { useState } from "react";
import Product from "../Product/Product";
import styles from "./products.module.css";

const Products = ({ products }) => {
 
  return (
    <div className={styles.products_container}>
      {products.map((product) => (
        <div key={product.id}>
          <Product product={product}/>
        </div>
      ))}
    </div>
  );
};

export default Products;
