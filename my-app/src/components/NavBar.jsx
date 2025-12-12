import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./NavBar.css";

export default function RootLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/items" className="nav-link">Characters</Link>

      
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>

        <div className="nav-right">
          {!user && (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/signup" className="nav-btn primary">Signup</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile" className="nav-btn">Profile</Link>
              <button onClick={logout} className="nav-btn danger">Logout</button>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">{children}</main>
    </>
  );
}