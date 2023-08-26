import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import BasketProducts from "./pages/BasketProducts/BasketProducts";
import EmptyBasket from "./pages/EmptyBasket/EmptyBasket";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts"

const App = () => {


  return (
    <>
        <Header />
      <Routes>
      <Route path='/products/:id' element={<CategoryProducts/>}/>
        <Route path="/" element={<Content/>} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/BasketProduct" element={<BasketProducts/>}/> 
        <Route path="/EmptyBasket" element={<EmptyBasket/>}/>
      </Routes>
    </>
  );
};

export default App;
