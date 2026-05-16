import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) return;

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const emailTaken = storedUsers.some(
      (storedUser) =>
        storedUser.email === email && storedUser.email !== user.email,
    );

    if (emailTaken) {
      setError(
        "That email is already signed up. Please use a different email.",
      );
      setMessage("");
      return;
    }

    updateProfile({ name, email });
    setError("");
    setMessage("Your profile was updated successfully.");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="p-6">
        <div className="rounded-3xl border border-orange-200 bg-orange-50 p-8 text-orange-900">
          <h1 className="text-2xl font-bold mb-3">Account</h1>
          <p className="mb-4">
            You need to sign in to view and update your account details.
          </p>
          <Link
            to="/login"
            className="rounded-full bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600"
          >
            Login now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Account Details</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-700">
            {message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <button className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
            Save profile
          </button>
        </form>
      </div>
    </div>
  );
}
