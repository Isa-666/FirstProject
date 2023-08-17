import React, { useState } from "react";
import styles from "./content.module.css";
import Products from "../Products/Products";
import { commerce } from "../../../lib/commerce/commerce";
import useFetch from "../../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";
const Content = () => {
  const { products } = useFetch(commerce);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(9);
  const indexOfLastPost = currentPage * productPerPage;
  const indexOfFirstPost = indexOfLastPost - productPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={styles.Products_container}>
      <Products products={currentPosts} />
      <Pagination
        productPerPage={productPerPage}
        paginate={paginate}
        totalProducts={products.length}
      />
    </div>
  );
};

export default Content;
