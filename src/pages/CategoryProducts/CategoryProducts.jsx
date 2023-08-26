import React, { useEffect, useState } from 'react'
import { getAllProductsByCategory } from "../../../lib/commerce/commerce"
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import styles from "./categoryproducts.module.css"
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai"
const CategortProducts = () => {
  const [count, setCount] = useState()
  const [allproducts, setAllProducts] = useState()
  const [searchParams, setSearchParams] = useSearchParams({ sortBy: "created_at" });
  const [filter, setFilter] = useState(searchParams.get(['filter'])?.split(",") || [])
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState(null)
  const sort = searchParams.get('sortBy')
  const id = useParams().id
  const GoBack = useNavigate();

  useEffect(() => {
    if (filter.length === 0) {
      getAllProductsByCategory(id, sort, page)
        .then((a) =>
          (setAllProducts(a?.data), setCount(a?.data?.length), setMeta(a?.meta))
        )
    }
  }, [id, sort, page])

  useEffect(() => {
    if (!searchParams.get('filter')) {
      searchParams.delete("filter")
      searchParams.set('sortBy', 'created_by')
      setSearchParams(searchParams)
      setFilter([])
    }
  }, [id])
  function handleChange(e, value) {
    setPage(value)
  }

  return (
    <div>
      <div className={styles.products_wrapper}>

        <div className={styles.a}>
          <div className={styles.total_products}> <button
            onClick={() => {
              GoBack("/");
            }}
            className={styles.GoBackButton}
          >
            Go Back
          </button><div className={styles.arrow_mobile_container}><AiOutlineArrowLeft onClick={() => {
            GoBack("/");
          }} className={styles.mobile_arrow} /></div>{count ? <span className={styles.counts_mobile}>{count} products found</span> : "Looking for a product..."}</div></div>
        <div className={styles.products}>
          <div className={styles.products_container}> {allproducts?.map((product) => (
            <div key={product.id} className={styles.product_wrapper}>
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
                </div>
              </div>
            </div>

          ))}
          </div>
        </div>
      </div>
      <div className={styles.products_pagination}>

        <Stack>
          <Pagination count={meta?.pagination?.total_pages} page={page} onChange={handleChange}></Pagination>
        </Stack>


      </div>

    </div>
  )
}

export default CategortProducts