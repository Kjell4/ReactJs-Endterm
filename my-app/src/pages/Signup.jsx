import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, setRepeatPassword, setError, setLoading, resetForm } from "../features/auth/authSlice";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, repeatPassword, error, loading } = useSelector(state => state.auth);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setError(""));

    if (!isValidEmail(email)) {
      dispatch(setError("Invalid email format"));
      return;
    }
    if (!isValidPassword(password)) {
      dispatch(setError("Password must be 8+ chars, include a number and special char"));
      return;
    }
    if (password !== repeatPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    dispatch(setLoading(true));

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(resetForm());
      navigate("/profile");
    } catch (err) {
      dispatch(setError(err.message));
    }

    dispatch(setLoading(false));
  };

  return (
    <section className="signup-container">
      <h1 className="signup-title">Signup</h1>

      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          className="signup-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          className="signup-input"
          required
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => dispatch(setRepeatPassword(e.target.value))}
          className="signup-input"
          required
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