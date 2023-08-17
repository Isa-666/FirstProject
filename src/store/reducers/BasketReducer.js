import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  cartLength: 0,
  cartItem: []
}

export const BasketSlice = createSlice({
  name: "basketProducts",
  initialState,
  reducers: {
    setCartLength:(state, {payload})=> {
      state.cartLength=payload
  },
  setCartItem:(state, {payload})=> {
      state.cartItem=payload
  },
  },
});
export const basketReducer = BasketSlice.reducer;
export const { setCartLength, setCartItem } = BasketSlice.actions;
