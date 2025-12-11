import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <section className="signup-container">
      <h1 className="signup-title">Signup</h1>

      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading} className="signup-button">
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>

      {error && <p className="signup-error">{error}</p>}

      <p className="signup-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}