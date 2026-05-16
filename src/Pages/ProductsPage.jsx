import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const saveOrder = (order) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]));
  };

  const createOrder = (items) => {
    const total = items.reduce(
      (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
      0,
    );

    return {
      id: `ORD-${Date.now()}`,
      user: user?.email || user?.name || "guest",
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "pending",
      paymentMethod: null,
      transportStage: "Waiting for payment",
    };
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, qty) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, qty) } : item,
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleItemPurchase = (id) => {
    const item = cartItems.find((product) => product._id === id);
    if (!item) return;

    const order = createOrder([item]);
    saveOrder(order);

    const updatedCart = cartItems.filter((product) => product._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate("/orders");
  };

  const handlePurchase = () => {
    if (cartItems.length === 0) return;

    const order = createOrder(cartItems);
    saveOrder(order);
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);

    navigate("/orders");
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
                className="h-28 w-full max-w-32.5 object-contain"
              />

              <div className="flex-1">
                <Link
                  to={`/products/${product._id}`}
                  className="text-lg font-semibold text-slate-900 hover:text-orange-600"
                >
                  {product.name}
                </Link>
                <p className="mt-2 text-sm text-slate-600">
                  ${Number(product.price || 0).toFixed(2)} each
                </p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          product._id,
                          (product.quantity || 1) - 1,
                        )
                      }
                      className="rounded-full bg-white px-2 py-1 text-slate-700 transition hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium text-slate-900">
                      {product.quantity || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          product._id,
                          (product.quantity || 1) + 1,
                        )
                      }
                      className="rounded-full bg-white px-2 py-1 text-slate-700 transition hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-orange-500 font-bold">
                    $
                    {(
                      (Number(product.price) || 0) * (product.quantity || 1)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemove(product._id)}
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-700 transition hover:border-red-300 hover:bg-red-100"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => handleItemPurchase(product._id)}
                    className="rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-right">
            <p className="text-sm text-slate-600">Order total</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              $
              {cartItems
                .reduce(
                  (s, it) => s + Number(it.price || 0) * (it.quantity || 1),
                  0,
                )
                .toFixed(2)}
            </p>
            <div className="mt-4 flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => {
                  localStorage.setItem("cart", JSON.stringify([]));
                  setCartItems([]);
                }}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Clear cart
              </button>
              <button
                onClick={handlePurchase}
                className="rounded-full bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
              >
                Purchase all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
