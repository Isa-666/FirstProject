import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./basketproducts.module.css";
import Moonloader from "react-spinners/MoonLoader";
// commerce api
import {
  getProductFromBasket,
  removeFromCart,
  updateCart,
  createCart,
} from "../../../lib/commerce/commerce";
import { setCartLength } from "../../store/reducers/BasketReducer";



const BasketProducts = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading]= useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create cart
  useEffect(() => {
    createCart().then((p) => localStorage.setItem("cart_id", p?.id));
    setLoading(true)
    if (count === 0) {
      navigate("/EmptyBasket");
    } else if (count > 0) {
      navigate("/BasketProduct");
    } else {
      navigate("/");
    }
  }, []);

  // get product from cart
  useEffect(() => {
    getProductFromBasket().then(
      (p) => (
        setLoading(false),
        setProducts(p.line_items, p.id),
        setTotalPrice(p.subtotal.formatted_with_symbol),
        // setCount(p.length),
        setCount(p.total_items),
        dispatch(setCartLength(p.total_unique_items))
      )
    );
  }, []);

  function deleteProduct(id) {
    removeFromCart(id).then(
      (p) => (
        setProducts(p.line_items),
        setTotalPrice(p.subtotal.formatted_with_symbol),
        dispatch(setCartLength(p.total_unique_items)),
        setCount(p.total_items)
      )
    );
  }

  function updateClick(id, quantity) {
    updateCart(id, quantity).then(
      (p) => (
        setProducts(p.line_items),
        setTotalPrice(p.subtotal.formatted_with_symbol),
        setCount(p.total_items)
       
      )
  
    );
  }
  return (
    <div>
      <div className={styles.basket_contianer}>
        <div className={styles.basket_body}>
          <div className={styles.basket_product_count}>
            Səbətdə ({count} məhsul var)
          </div>
          <div className={styles.basket_wrapper}>
            <div className={styles.basket_items}>
              
              {loading ? (<Moonloader size={100} color={"blue"}/>) :  products?.map((el) => (
                <div key={el.id} className={styles.basket_products}>
                  <div className={styles.product_image_container}>
                    <Link to={`/ProductDetails/${el.product_id}`}>
                      <img
                        className={styles.image_prouct}
                        src={el.image?.url}
                      />
                    </Link>
                    <div className={styles.products_name}>
                      {el.name}
                      <div className={styles.products_color_price_info}>
                        <span className={styles.price}>
                          Cost: {el.price.formatted_with_symbol}
                        </span>
                        <div className={styles.products_count}>
                          <div
                            onClick={() =>
                              el.quantity > 1 &&
                              updateClick(el.id, +(el.quantity - 1))
                            }
                            className="div-icon"
                          >
                            <AiOutlineMinus className={styles.plus_and_minus} />
                          </div>
                          <p>{el.quantity}</p>
                          <div
                            onClick={() =>
                              updateClick(el.id, +(el.quantity + 1))
                            }
                            className="div-icon"
                          >
                            <AiOutlinePlus className={styles.plus_and_minus} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.deletebtn}>
                    <div onClick={() => deleteProduct(el.id)}>
                      <RiDeleteBin5Line className={styles.delete_button} />
                    </div>
                  </div>
                </div>
              ))}
           
            </div>
            <div className={styles.full_cost}>
              <h1>Ümumi</h1>
              <ul className={styles.info_basket_price}>
                <li className="total-list-item">
                  <span>Məbləğ:</span>
                  <span className="list-item-price">{totalPrice}</span>
                </li>
                <li className="total-list-item">
                  <span>Hədiyyə paketi:</span>
                  <span className="list-item-price">0</span>
                </li>
                <li className="total-list-item">
                  <span>Promo kod:</span>
                  <span className="list-item-price">00.00</span>
                </li>
                <li className="total-list-item">
                  <div className={styles.total_price}>
                    Cəmi:<span>{totalPrice}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketProducts;
