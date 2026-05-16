import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, BASE_URL]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-contain" />
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
