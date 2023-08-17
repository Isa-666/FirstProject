import React, { useState } from "react";
import styles from "./productdetails.module.css";
import useFetchViewDetails from "../../../hooks/useFetchViewDetails";
import { commerce } from "../../../lib/commerce/commerce";
import { useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Moonloader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../../lib/commerce/commerce";
import { setCartLength } from "../../store/reducers/BasketReducer";
import { HiOutlinePlus } from "react-icons/hi";
import { AiOutlineMinus } from "react-icons/ai";
const ProductDetails = () => {
  const { product } = useFetchViewDetails(commerce);
  const { loading } = useFetch(commerce);
  const [count, setCount] = useState(1);
  const [slideIndex, setSlideIndex] = useState(1);
  const GoBack = useNavigate();
  const dispatch = useDispatch();
  function decrease() {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  }
  function increase() {
    setCount((prev) => prev + 1);
  }
  function addToBasket() {
    addProductToCart(product?.id, count).then((res) => {
      dispatch(setCartLength(res.total_unique_items));
    });
  }

  if (loading) {
    return (
      <div className={styles.productDetailFundamentLoading}>
        <div className={styles.productDetailContainerLoading}>
          <div className={styles.moonLoader}>
            <Moonloader color={"blue"} loading={loading} size={100} />
          </div>
        </div>
      </div>
    );
  } else if (!loading) {
    return (
      <div>
        <button
          onClick={() => {
            GoBack(-1);
          }}
          className={styles.GoBackButton}
        >
          Go Back
        </button>
        <div className={styles.productDetailFundament}>
          <div className={styles.productDetailContainer}>
            <div className={styles.imageContainer}>
              <div>
                {product.assets?.map((pro, index) => (
                  <div
                    key={pro.id}
                    style={{
                      display: index + 1 === slideIndex ? "block" : "none",
                    }}
                  >
                    <img className={styles.image} src={pro.url} alt="" />
                  </div>
                ))}
              </div>
              <div className={styles.productOtherImagesContainer}>
                {product.assets?.map((pro, index) => (
                  <div key={pro.id} className={styles.images}>
                    <img
                      onClick={() => setSlideIndex(index + 1)}
                      className={`${styles.otherImagesVariants} ${
                        index + 1 === slideIndex && styles.styleActive
                      }`}
                      src={pro.url}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.ProductDetails}>
              <span className={styles.productName}>{product.name}</span>
              <div className={styles.Description}>Description</div>
              <div
                className={styles.productDescription}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className={styles.productPrice}>
                Cost : <span> {product.price}</span>
              </div>
              <div className={styles.colorsSection}>
                Colors :{" "}
                <div>
                  {product.variant_groups?.map((pro) => (
                    <div className={styles.colorContainer} key={pro.id}>
                      {pro.options?.map((pro) => (
                        <div
                          className={styles.color}
                          style={{ backgroundColor: pro.name }}
                          key={pro.id}
                        >
                          <span className={styles.colorName}>{pro.name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.quantity_container}>
                <p className="count-title">Quantity:</p>
                <div onClick={decrease} className={styles.quantity_button}>
                  <AiOutlineMinus />
                </div>
                <p>{count}</p>
                <div onClick={increase} className={styles.quantity_button}>
                  <HiOutlinePlus />
                </div>
              </div>
              <div className={styles.buttonAddSection}>
                <button onClick={addToBasket} className={styles.buttonAdd}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
