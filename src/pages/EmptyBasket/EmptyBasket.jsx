import React from "react";
import styles from "./emptybasket.module.css";
import { useNavigate } from "react-router-dom";
import shopLogo from "./assets/360-removebg-preview.png";
const EmptyBasket = () => {

  const navigate = useNavigate();
  return (
    <div className={styles.empty_basket_container}>
      <img className={styles.shop_logo} src={shopLogo} alt="" />
      <div className={styles.no_product_text}>
        You have no products in your shopping cart...
      </div>
      
        <button
        className={styles.GoBackButton}
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </button>
    
    </div>
  );
};

export default EmptyBasket;
