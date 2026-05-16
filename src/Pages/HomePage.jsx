import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const BASE_URL = import.meta.env.VITE_API_URL;
  const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${BASE_URL}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [BASE_URL]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return name.includes(searchQuery) || description.includes(searchQuery);
    });
  }, [products, searchQuery]);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();

    if (!user) {
      navigate("/signup");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartHasProduct = storedCart.some((item) => item._id === product._id);

    if (!cartHasProduct) {
      storedCart.push(product);
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }

    navigate("/products");
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          {searchQuery ? (
            <p className="mt-1 text-sm text-slate-500">
              Search results for "{searchQuery}"
            </p>
          ) : null}
        </div>
      </div>

      {searchQuery && filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-700">
          No products matched "{searchQuery}". Try another search term.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-44 w-full object-contain transition duration-300 group-hover:scale-105"
              />

              <div className="mt-4">
                <h3 className="text-base font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-orange-500 font-bold">
                  ${product.price}
                </p>
              </div>

              <button
                type="button"
                onClick={(event) => handleAddToCart(product, event)}
                className="mt-4 w-full rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
