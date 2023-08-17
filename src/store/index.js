import { configureStore } from '@reduxjs/toolkit'
import { basketReducer } from './reducers/BasketReducer'

export default configureStore({
  reducer: {
    basketProducts: basketReducer, 
  }
})