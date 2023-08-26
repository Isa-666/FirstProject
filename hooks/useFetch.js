import { useEffect, useState } from "react";
import { commerce } from "../lib/commerce/commerce";
export default function useFetch(url) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const asyncFunction = async () => {
    const { data: product } = await commerce.products.list();

    setProducts(product);


    try {
      setLoading(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncFunction();
    setLoading(true);
  }, [url]);

  return {
    products,
    error,
    loading,

  };
}
