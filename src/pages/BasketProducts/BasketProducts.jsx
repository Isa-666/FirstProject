import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./basketproducts.module.css";
import Moonloader from "react-spinners/MoonLoader";
import {AiOutlineArrowLeft} from "react-icons/ai";
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
  const [loading, setLoading] = useState(true)
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
        setTotalPrice(p.subtotal.raw),
        // setCount(p.length),
        setCount(p.total_items),
        dispatch(setCartLength(p.total_unique_items))
      )
    );
  }, []);

  function deleteProduct(id) {
    setLoading(true)
    removeFromCart(id).then(
      (p) => (
        setProducts(p.line_items),
        setTotalPrice(p.subtotal.raw),
        dispatch(setCartLength(p.total_unique_items)),
        setCount(p.total_items),
        setLoading(false)
      )
    );
  }


  function updateClick(id, quantity) {
    setLoading(true),
      updateCart(id, quantity).then(
        (p) => (
          setProducts(p.line_items),
          setTotalPrice(p.subtotal.raw),
          setCount(p.total_items),
          setLoading(false)

        )

      );
  }

  return (
    <div>
      <div className={styles.basket_contianer}>
        <div className={styles.basket_body}>
          <div className={styles.basket_product_count}>
            <button onClick={() => {
              navigate("/");
            }} className={styles.GoBackButton}>Go Back</button>
            <div className={styles.arrow_mobile_container}><AiOutlineArrowLeft onClick={() => {
            navigate("/");
          }} className={styles.mobile_arrow} /></div>
            <span>In cart total <span className={styles.count}>{count}</span> items</span>
          </div>
          <div className={styles.basket_wrapper}>
            <div className={styles.basket_items}>

              {loading ? (<Moonloader size={100} color={"blue"} />) : products?.map((el) => (
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
                          Cost: {el.price.raw}$
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
                          <p className={styles.quantity_num_mobile}>{el.quantity}</p>
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
              <h1>General</h1>
              <ul className={styles.info_basket_price}>
                <li className={styles.totalItemsProduct}>
                  <span>Amount:</span>
                  <span className="list-item-price">{loading ? (<Moonloader size={20} color={"#ff0000"} />) : totalPrice && <span>{`${totalPrice} ${'$'} `}</span>}</span>
                </li>
                <li className={styles.totalItemsProduct}>
                  <span>Gifts:</span>
                  <span className="list-item-price">{loading ? (<Moonloader size={20} color={"#ff0000"} />) : <span>00.00</span>}</span>
                </li>
                <li className={styles.totalItemsProduct}>
                  <span>Promo:</span>
                  <span className="list-item-price">{loading ? (<Moonloader size={20} color={"#ff0000"} />) : <span>00.00</span>}</span>
                </li>
                <li>
                  <div className={styles.total_price}>
                    Total:{loading ? (<Moonloader size={20} color={"#ff0000"} />) : totalPrice && <span>{`${totalPrice} ${'$'} `}</span>}
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
