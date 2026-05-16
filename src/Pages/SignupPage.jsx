import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const existingAccount = storedUsers.find((user) => user.email === email);

    if (existingAccount) {
      setError("An account with that email already exists. Please log in.");
      return;
    }

    const newUser = {
      name: name || "New Customer",
      email,
      password,
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const fakeToken = "signup_token_123";
    login(newUser, fakeToken);
    navigate("/account");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h1 className="text-2xl font-bold mb-5">Sign Up</h1>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mb-4 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-6 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
      />

      <button className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
        Create account
      </button>

      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-orange-500 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
