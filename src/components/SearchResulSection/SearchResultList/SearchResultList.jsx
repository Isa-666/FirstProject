import React from 'react'
import styles from "./searchresultlist.module.css"
import SearchResults from '../SearchResults/SearchResults'
const SearchResultList = ({results, handleChange}) => {
  return (
    <div>
      
    {results.map((product)=>{ 
        return <div className={styles.SearchResultsContainer} key={product.id}><SearchResults handleChange={handleChange} product={product}/></div>
    })}</div>
  )
}

export default SearchResultList;