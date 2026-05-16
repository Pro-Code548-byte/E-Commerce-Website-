import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const lastEmail = localStorage.getItem("lastUserEmail");
    if (!lastEmail) return;

    setEmail(lastEmail);
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedUser = storedUsers.find((user) => user.email === lastEmail);

    if (matchedUser) {
      setPassword(matchedUser.password || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password,
    );

    if (!matchedUser) {
      setError(
        "No account found with that email and password. Please sign up first.",
      );
      return;
    }

    const fakeToken = "sample_jwt_token_123456";
    login(matchedUser, fakeToken);
    navigate("/account");
  };

  const handleForgotPassword = () => {
    setError("");
    setInfo("");

    if (!email) {
      setError("Please enter your email to recover your password.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedUser = storedUsers.find((user) => user.email === email);

    if (!matchedUser) {
      setError("No account found for that email.");
      return;
    }

    setInfo(`Your saved password is: ${matchedUser.password}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-3"
        required
      />

      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-orange-500 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {info ? (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
          {info}
        </div>
      ) : null}

      <button className="bg-orange-500 text-white px-4 py-2 w-full rounded">
        Login
      </button>

      <p className="mt-4 text-center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
}
