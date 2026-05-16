import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, BASE_URL]);

  if (!product) return <p>Loading...</p>;

  const price = Number(product.price) || 0;
  const total = (price * quantity).toFixed(2);

  function addToCart() {
    setAdding(true);
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const cart = JSON.parse(raw);

      const existingIndex = cart.findIndex((c) => c._id === product._id);
      if (existingIndex > -1) {
        cart[existingIndex].quantity = Math.min(
          30,
          cart[existingIndex].quantity + quantity,
        );
      } else {
        cart.push({
          _id: product._id,
          name: product.name,
          price: price,
          imageUrl: product.imageUrl,
          quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setTimeout(() => setAdding(false), 350);
    } catch (err) {
      console.error("Add to cart failed", err);
      setAdding(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="mx-auto h-80 w-full max-w-md object-contain"
          />
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-slate-600">{product.description}</p>
            <p className="mt-4 text-3xl font-extrabold text-orange-500">
              ${price.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Total:{" "}
              <span className="font-semibold text-slate-800">${total}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-slate-700">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2">
                <button
                  onClick={() => {
                    if (!user) return navigate("/signup");
                    setQuantity((q) => Math.max(1, q - 1));
                  }}
                  className="px-3 text-lg text-slate-700"
                  aria-label="decrease"
                >
                  −
                </button>
                <div className="px-3 text-sm font-medium">{quantity}</div>
                <button
                  onClick={() => {
                    if (!user) return navigate("/signup");
                    setQuantity((q) => Math.min(30, q + 1));
                  }}
                  className="px-3 text-lg text-slate-700"
                  aria-label="increase"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  if (!user) return navigate("/signup");
                  addToCart();
                }}
                disabled={adding}
                className="rounded-full bg-orange-500 px-4 py-2 text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
              >
                {adding ? "Adding…" : "Add to cart"}
              </button>
            </div>

            <p className="text-xs text-slate-500">
              You can add up to 30 units per product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
