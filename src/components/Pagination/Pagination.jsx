import React from 'react'
import styles from "./pagination.module.css"
const Pagination = ({productPerPage, totalProducts,paginate}) => {
    const pageNumbers=[];
    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i)
        
    }
  return (
    <div className={styles.page_numbers_container}><ul className={styles.numbers}>
        {pageNumbers.map(number=>(
            <li onClick={()=>paginate(number)} key={number} >
                {number}
            </li>
        ))}
        </ul></div>
  )
}

export default Pagination