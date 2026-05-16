import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {!user ? (
        <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6 text-orange-900">
          <p className="mb-4 text-lg font-medium">
            Please sign up or log in to save items in your cart.
          </p>
          <Link
            to="/signup"
            className="inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Sign up now
          </Link>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="mb-4 text-slate-700">Your cart is empty.</p>
          <Link
            to="/"
            className="text-orange-500 font-semibold hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((product) => (
            <div
              key={product._id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-28 w-full max-w-[130px] object-contain"
              />

              <div className="flex-1">
                <Link
                  to={`/products/${product._id}`}
                  className="text-lg font-semibold text-slate-900 hover:text-orange-600"
                >
                  {product.name}
                </Link>
                <p className="mt-2 text-orange-500 font-bold">
                  ${product.price}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(product._id)}
                className="w-full rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-700 transition hover:border-red-300 hover:bg-red-100 sm:w-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
