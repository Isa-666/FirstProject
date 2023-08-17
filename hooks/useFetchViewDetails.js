import { useEffect, useState } from "react";
import { commerce } from "../lib/commerce/commerce";

export default function useFetchViewDetails() {
  const [product, setProduct] = useState({});
  const FetchProductDetails = async (id) => {
    const response = await commerce.products.retrieve(id);
    const { name, price, image,quantity, description, variant_groups,assets} = response;
   setProduct({
      id:response.id,
      name,
      price: `${price.raw} ${"$"}`,
      image,
      src: image.url,
      quantity,
      description,
      variant_groups,
      assets
    });
  };
  useEffect(() => {
    const id = window.location.pathname.split("/");
    FetchProductDetails(id);
  }, []);
  return {
    product,
  };
}
