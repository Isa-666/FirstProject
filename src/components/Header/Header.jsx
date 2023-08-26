import React, { useEffect } from "react";
import Commerce from '@chec/commerce.js'
import { AiFillShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./check.css"
import useFetch from "../../../hooks/useFetch"
import styles from "./header.module.css"
import SearchResultList from "../SearchResulSection/SearchResultList/SearchResultList";
import { commerce } from "../../../lib/commerce/commerce";
import { AiOutlineSearch } from "react-icons/ai"
import { useState } from "react";
const Header = () => {
  const { products } = useFetch(commerce);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const basketProducts = useSelector(
    (state) => state.basketProducts.cartLength
  );


  const getResult = (value) => {
    const results = products.filter((pro) => {
      if (pro) {
        return (
          value &&
          pro &&
          pro.name &&
          pro.name?.toLowerCase().includes(value.toLowerCase())
        )
      }

    });
    setResults(results);
  };
  const handleChange = (value) => {
    setSearchTerm(value);
    getResult(value);
  }

  function handleBasket() {
    if (basketProducts > 0) {
      navigate("/BasketProduct");
    } else (
      navigate("/EmptyBasket")
    )
  }

  return (<div className={styles.abc}>
    <div className={styles.headerContainer}>
      <div className={styles.search_results_section}>
        <div className={styles.box}>
          <input type="checkbox" id="check" />
          <div className="search_box">
            <input type="text" placeholder="Type product name..." className={styles.input_search} value={searchTerm} onChange={(e) => handleChange(e.target.value)} />
            <label htmlFor="check" className={styles.iconSearch}>
              <i className={styles.logoContainer}><AiOutlineSearch className={styles.searchLogo} /></i></label>
          </div>
        </div>
        <div style={{ display: searchTerm ? "block" : "none" }} className={styles.input_products_filter}>
          <SearchResultList handleChange={handleChange} results={results} />
        </div>
      </div>
      <div className={styles.shopping_logo_container}>
        <AiFillShopping onClick={() => handleBasket()} className={styles.shoppingLogo} />
        <div className={styles.product_counter_logo}>{basketProducts}</div>
      </div>
  </div>
  <div className={styles.container_wrapper}>
  <div className={styles.categories_container}>
  <Link className={styles.link_container} to={`/products/mobile-devices`}>
                    <div className={styles.categories}>Mobile-devices</div>
                  </Link>
                  <Link className={styles.link_container} to={`/products/accessories`}>
                    <div className={styles.categories}>Accessories</div>
                  </Link>
                  <Link className={styles.link_container} to={`/products/macbooks`}>
                    <div className={styles.categories}>Macbooks</div>
                  </Link>
                  </div>
                  </div>
    </div>
 
  );
};

export default Header;
