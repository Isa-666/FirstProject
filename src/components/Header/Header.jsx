import React from "react";
import { AiFillShopping } from "react-icons/ai";
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./header.module.css"
const Header = () => {
  const navigate = useNavigate();
  const basketProducts = useSelector(
    (state) => state.basketProducts.cartLength
  );

function handleBasket() {
  if (basketProducts > 0) {
    navigate("/BasketProduct");
  } else (
    navigate("/EmptyBasket")
  )
}

  return (
    <div className={styles.headerContainer}>
      <div>
        <AiFillShopping onClick={()=>handleBasket()} className={styles.shoppingLogo}/>
       <div className={styles.product_counter_logo}>{basketProducts}</div>
       
      </div>
    </div>
  );
};

export default Header;
