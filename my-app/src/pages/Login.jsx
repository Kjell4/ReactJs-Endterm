import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <section className="login-container">
      <h1 className="login-title">Login</h1>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading} className="login-button">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}

      <p className="login-footer">
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </section>
  );
}