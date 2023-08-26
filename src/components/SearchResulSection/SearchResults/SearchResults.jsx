import React from 'react'
import styles from "./searchresults.module.css"
import { Link } from 'react-router-dom';
const SearchResults = ({ product, handleChange }) => {
    return (
        <Link
            onClick={(e) => {
                handleChange("");
            }}
className={styles.link_css}
            to={`/ProductDetails/${product.id}`}
        >
            <div className={styles.result_products}>
                <img
                    className={styles.product_image}
                    src={product.image?.url}
                    alt=""
                />
                <div className={styles.product_name}>
                    {product.name}
                    <div className={styles.product_price}>
                        <strong>{product.price?.raw} azn</strong>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchResults