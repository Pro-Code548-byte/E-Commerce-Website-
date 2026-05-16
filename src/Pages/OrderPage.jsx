import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router";

export default function OrderPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [paymentSelections, setPaymentSelections] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    const my = user
      ? saved.filter((o) => o.user === (user.email || user.name))
      : saved;
    setOrders(my);

    const defaultMethods = my.reduce((acc, order) => {
      acc[order.id] = order.paymentMethod || "card";
      return acc;
    }, {});
    setPaymentSelections(defaultMethods);
  }, [user]);

  function updateSelection(orderId, method) {
    setPaymentSelections((current) => ({ ...current, [orderId]: method }));
  }

  function pay(orderId, method) {
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    const updated = all.map((o) => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        status: "paid",
        paymentMethod: method,
        paidAt: new Date().toISOString(),
        transportStage: "Preparing package",
      };
    });
    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated.filter((o) => o.user === (user?.email || user?.name)));
    alert(
      `Order ${orderId} checked out with ${method === "cod" ? "Cash on Delivery" : "Card"}.`,
    );
  }

  function getTransportMessage(order) {
    if (order.status !== "paid") {
      return "Your order will start moving as soon as checkout completes.";
    }

    switch (order.transportStage) {
      case "Preparing package":
        return "Your package is being prepared and will be handed to the courier soon.";
      case "Out for delivery":
        return "Your order is on the way and should arrive soon.";
      case "Delivered":
        return "Your order has been delivered. Thank you for shopping with us.";
      default:
        return "Your order payment is confirmed and transport tracking will begin shortly.";
    }
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-slate-700">No orders yet.</p>
          <Link
            to="/"
            className="text-orange-500 font-semibold hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => {
          const method = paymentSelections[order.id] || "card";

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm text-slate-600">Order ID: {order.id}</p>
                  <p className="text-sm text-slate-600">
                    Placed: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600">
                    Status: {order.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-slate-900">
                    ${order.total.toFixed(2)}
                  </p>
                  {order.status === "paid" && (
                    <p className="text-sm text-green-600 mt-1">
                      Paid with{" "}
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Card"}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((it) => (
                  <div key={it._id} className="flex items-center gap-4">
                    <img
                      src={it.imageUrl}
                      alt={it.name}
                      className="h-14 w-14 object-contain"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{it.name}</p>
                      <p className="text-sm text-slate-600">
                        Qty: {it.quantity || 1}
                      </p>
                    </div>
                    <p className="font-semibold text-orange-500">
                      $
                      {((Number(it.price) || 0) * (it.quantity || 1)).toFixed(
                        2,
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {order.status !== "paid" ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="min-w-35 text-sm text-slate-700">
                      Payment method
                      <select
                        value={method}
                        onChange={(e) =>
                          updateSelection(order.id, e.target.value)
                        }
                        className="ml-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm"
                      >
                        <option value="card">Card</option>
                        <option value="cod">Cash on Delivery</option>
                      </select>
                    </label>
                    <button
                      onClick={() => pay(order.id, method)}
                      className="rounded-full bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                    >
                      Checkout
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-green-600">
                    Order is paid and transport tracking is active.
                  </p>
                )}
              </div>

              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Delivery tracker
                </p>
                <p className="text-sm text-slate-600">
                  {getTransportMessage(order)}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li
                    className={
                      order.status === "paid"
                        ? "text-slate-900 font-medium"
                        : ""
                    }
                  >
                    • Payment completed
                  </li>
                  <li
                    className={
                      order.status === "paid"
                        ? "text-slate-900 font-medium"
                        : "text-slate-500"
                    }
                  >
                    • Package prepared
                  </li>
                  <li
                    className={
                      order.status === "paid"
                        ? "text-slate-900 font-medium"
                        : "text-slate-500"
                    }
                  >
                    • Courier pickup
                  </li>
                  <li
                    className={
                      order.status === "paid"
                        ? "text-slate-900 font-medium"
                        : "text-slate-500"
                    }
                  >
                    • Delivered to address
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
